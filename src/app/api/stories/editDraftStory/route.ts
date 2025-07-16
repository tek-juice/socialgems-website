//this routes edits stories only in draft status for each particular user who is logged in
// this route edits any story, picture-comic, audio, poll, trivia.
import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';
import { getPublicSupabase } from '@/app/lib/supabase';

export async function GET(request: NextRequest) {
    const session = await getSession(request);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await db.connect();
    try {
        // Get user ID from session
        const userEmail = session.user.email;
        if (typeof userEmail !== 'string') {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
        }
        
        const userRes = await client.sql`SELECT id FROM profile WHERE email = ${userEmail}`;
        if (userRes.rows.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const userId = userRes.rows[0].id;

        // Query to get all draft stories with user information and type-specific data
        const query = `
            SELECT 
                s.id as story_id,
                s.title,
                s.type,
                s.status,
                s.created_at,
                s.updated_at,
                s.admin_feedback,
                s.tags,
                p.id as user_id,
                p.fname,
                p.lname,
                p.email,
                p.image as user_image,
                -- Text story content
                ts.content as text_content,
                -- Picture story data
                ps.image_urls,
                ps.content as picture_description,
                -- Audio story data
                audio.audio_url,
                -- Poll data
                poll.question as poll_question,
                poll.options as poll_options,
                poll.multiple_answers,
                -- Trivia quiz data
                tq.question as trivia_question,
                tq.correct_answer,
                tq.options as trivia_options,
                tq.time_limit
            FROM stories s
            JOIN profile p ON s.user_id = p.id
            LEFT JOIN text_stories ts ON s.id = ts.story_id
            LEFT JOIN picture_stories ps ON s.id = ps.story_id
            LEFT JOIN audio_stories audio ON s.id = audio.story_id
            LEFT JOIN polls poll ON s.id = poll.story_id
            LEFT JOIN trivia_quizzes tq ON s.id = tq.story_id
            WHERE s.user_id = $1 AND s.status = 'draft'
            ORDER BY s.created_at DESC
        `;
        
        const { rows } = await client.query(query, [userId]);
        
        // Process the stories to include type-specific content
        const processedStories = rows.map((story: any) => {
            let processedStory: any = {
                story_id: story.story_id,
                title: story.title,
                type: story.type,
                status: story.status,
                created_at: story.created_at,
                updated_at: story.updated_at,
                admin_feedback: story.admin_feedback,
                tags: story.tags || [],
                user_id: story.user_id,
                fname: story.fname,
                lname: story.lname,
                email: story.email,
                user_image: story.user_image
            };

            // Add type-specific content
            switch (story.type) {
                case 'story':
                    processedStory.content = story.text_content;
                    break;
                case 'picture_comic':
                    processedStory.image_urls = story.image_urls;
                    processedStory.description = story.picture_description;
                    break;
                case 'audio':
                    processedStory.audio_url = story.audio_url;
                    break;
                case 'poll':
                    processedStory.question = story.poll_question;
                    processedStory.options = story.poll_options;
                    processedStory.multiple_answers = story.multiple_answers;
                    break;
                case 'trivia_quiz':
                    processedStory.question = story.trivia_question;
                    processedStory.correct_answer = story.correct_answer;
                    processedStory.options = story.trivia_options;
                    processedStory.time_limit = story.time_limit;
                    break;
            }

            return processedStory;
        });

        return NextResponse.json({ 
            success: true,
            stories: processedStories
        }, { status: 200 });
        
    } catch (error) {
        console.error('Error fetching draft stories:', error);
        return NextResponse.json({ 
            success: false,
            error: 'Database error: ' + (error as Error).message 
        }, { status: 500 });
    } finally {
        await client.release();
    }
}

export async function PUT(request: NextRequest) {
    const session = await getSession(request);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getPublicSupabase();
    const client = await db.connect();
    try {
        const formData = await request.formData();
        const storyId = formData.get('storyId') as string;
        const storyType = formData.get('storyType') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const tagsRaw = formData.get('tags') as string;

        if (!storyId || !storyType || !title) {
            return NextResponse.json({ error: 'Story ID, type, and title are required' }, { status: 400 });
        }

        // Get user ID from session
        const userEmail = session.user.email;
        if (typeof userEmail != 'string') {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
        }
        
        const userRes = await client.sql`SELECT id FROM profile WHERE email = ${userEmail}`;
        if (userRes.rows.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const userId = userRes.rows[0].id;

        // Verify story belongs to user and is in draft status
        const storyCheck = await client.sql`
            SELECT id, type, status FROM stories 
            WHERE id = ${storyId} AND user_id = ${userId} AND status = 'draft'
        `;
        
        if (storyCheck.rows.length === 0) {
            return NextResponse.json({ error: 'Story not found, access denied, or not in draft status' }, { status: 404 });
        }

        const story = storyCheck.rows[0];
        if (story.type !== storyType) {
            return NextResponse.json({ error: 'Story type mismatch' }, { status: 400 });
        }

        // Parse tags
        let tags: string[] = [];
        if (tagsRaw) {
            try {
                tags = JSON.parse(tagsRaw);
            } catch {
                tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
            }
        }

        // Update main story record
        await client.sql`
            UPDATE stories 
            SET title = ${title}, 
                tags = ${'{' + tags.map(tag => `"${tag}"`).join(',') + '}'},
                updated_at = NOW()
            WHERE story_id = ${storyId}
        `;

        // Update type-specific content based on story type
        switch (storyType) {
            case 'story':
                if (description) {
                    await client.sql`
                        UPDATE text_stories 
                        SET content = ${description}
                        WHERE story_id = ${storyId}
                    `;
                }
                break;

            case 'picture_comic':
                const images = formData.getAll('image') as File[];
                if (images.length > 0) {
                    // Validate images
                    if (images.length > 4) {
                        return NextResponse.json({ error: 'You can upload up to 4 images only.' }, { status: 400 });
                    }

                    // Validate and upload images
                    const imageUrls: string[] = [];
                    
                    for (let i = 0; i < images.length; i++) {
                        const image = images[i];
                        
                        if (!(image instanceof File)) {
                            continue;
                        }
                        
                        if (image.size > 102400) {
                            return NextResponse.json({ error: 'Each image must be 100KB or less.' }, { status: 400 });
                        }
                        
                        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
                        if (!allowedTypes.includes(image.type)) {
                            return NextResponse.json({ error: 'Invalid image format.' }, { status: 400 });
                        }
                        
                        const fileExt = image.name.split('.').pop();
                        const filePath = `picture-attachments/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                        
                        try {
                            const { data: uploadData, error: uploadError } = await supabase.storage
                                .from('picture-attachments')
                                .upload(filePath, image, { contentType: image.type });
                                
                            if (uploadError) {
                                return NextResponse.json({ error: 'Failed to upload image: ' + uploadError.message }, { status: 500 });
                            }
                            
                            const { data: publicUrlData } = supabase.storage.from('picture-attachments').getPublicUrl(filePath);
                            const imageUrl = publicUrlData?.publicUrl;
                            
                            if (imageUrl) {
                                imageUrls.push(imageUrl);
                            }
                        } catch (error) {
                            return NextResponse.json({ error: 'Upload exception: ' + (error as Error).message }, { status: 500 });
                        }
                    }

                    // Update picture_stories with new image URLs
                    const imageUrlsArray = '{' + imageUrls.map(url => `"${url}"`).join(',') + '}';
                    await client.sql`
                        UPDATE picture_stories 
                        SET image_urls = ${imageUrlsArray},
                            content = ${description || ''}
                        WHERE story_id = ${storyId}
                    `;
                } else if (description) {
                    // Only update description if no new images
                    await client.sql`
                        UPDATE picture_stories 
                        SET content = ${description}
                        WHERE story_id = ${storyId}
                    `;
                }
                break;

            case 'audio':
                const audioFile = formData.get('audio') as File;
                if (audioFile) {
                    // Validate audio file
                    if (audioFile.size > 2 * 1024 * 1024) {
                        return NextResponse.json({ error: 'Audio file must be 2MB or less.' }, { status: 400 });
                    }
                    
                    const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/x-m4a', 'audio/wav', 'audio/ogg'];
                    if (!allowedTypes.includes(audioFile.type)) {
                        return NextResponse.json({ error: 'Invalid audio format.' }, { status: 400 });
                    }

                    // Upload to Supabase Storage
                    const fileExt = audioFile.name.split('.').pop();
                    const filePath = `audio-attachments/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                    
                    try {
                        const { data: uploadData, error: uploadError } = await supabase.storage
                            .from('audio-attachments')
                            .upload(filePath, audioFile, { contentType: audioFile.type });

                        if (uploadError) {
                            return NextResponse.json({ error: 'Failed to upload audio: ' + uploadError.message }, { status: 500 });
                        }

                        // Get public URL
                        const { data: publicUrlData } = supabase.storage.from('audio-attachments').getPublicUrl(filePath);
                        const audioUrl = publicUrlData?.publicUrl;

                        if (!audioUrl) {
                            return NextResponse.json({ error: 'Failed to generate audio URL' }, { status: 500 });
                        }

                        // Update audio_stories with new audio URL
                        await client.sql`
                            UPDATE audio_stories 
                            SET audio_url = ${audioUrl}
                            WHERE story_id = ${storyId}
                        `;
                    } catch (error) {
                        return NextResponse.json({ error: 'Upload exception: ' + (error as Error).message }, { status: 500 });
                    }
                }
                break;

            case 'poll':
                const question = formData.get('question') as string;
                const option1 = formData.get('option1') as string;
                const option2 = formData.get('option2') as string;
                const option3 = formData.get('option3') as string;
                const option4 = formData.get('option4') as string;

                if (question && option1 && option2) {
                    const options = [option1, option2];
                    if (option3) options.push(option3);
                    if (option4) options.push(option4);

                    const optionsJson = JSON.stringify(options.map(opt => ({ text: opt, votes: 0 })));
                    
                    await client.sql`
                        UPDATE polls 
                        SET question = ${question}, 
                            options = ${optionsJson}
                        WHERE story_id = ${storyId}
                    `;
                }
                break;

            case 'trivia_quiz':
                const quizQuestion = formData.get('question') as string;
                const correctAnswer = formData.get('correct') as string;
                const quizOption1 = formData.get('option1') as string;
                const quizOption2 = formData.get('option2') as string;
                const quizOption3 = formData.get('option3') as string;

                if (quizQuestion && correctAnswer && quizOption1 && quizOption2) {
                    const options = [quizOption1, quizOption2];
                    if (quizOption3) options.push(quizOption3);

                    const optionsArray = '{' + options.map(opt => `"${opt}"`).join(',') + '}';
                    
                    await client.sql`
                        UPDATE trivia_quizzes 
                        SET question = ${quizQuestion}, 
                            correct_answer = ${correctAnswer},
                            options = ${optionsArray}
                        WHERE story_id = ${storyId}
                    `;
                }
                break;

            default:
                return NextResponse.json({ error: 'Invalid story type' }, { status: 400 });
        }

        // Get updated story data
        const updatedStoryRes = await client.sql`
            SELECT s.*, p.fname, p.lname, p.email
            FROM stories s
            JOIN profile p ON s.user_id = p.id
            WHERE s.id = ${storyId}
        `;

        return NextResponse.json({ 
            success: true,
            message: 'Story updated successfully',
            story: updatedStoryRes.rows[0]
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating story:', error);
        return NextResponse.json({ 
            success: false,
            error: 'Database error: ' + (error as Error).message 
        }, { status: 500 });
    } finally {
        await client.release();
    }
}

 