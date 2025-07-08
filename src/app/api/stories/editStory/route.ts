// this route edits any story, picture-comic, audio, poll, trivia.
import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';

export async function PUT(request: NextRequest) {
    const session = await getSession(request);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
        const userRes = await client.sql`SELECT id FROM profile WHERE email = ${session.user.email}`;
        if (userRes.rows.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const userId = userRes.rows[0].id;

        // Verify story belongs to user
        const storyCheck = await client.sql`
            SELECT id, type, status FROM stories 
            WHERE id = ${storyId} AND user_id = ${userId}
        `;
        
        if (storyCheck.rows.length === 0) {
            return NextResponse.json({ error: 'Story not found or access denied' }, { status: 404 });
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
            WHERE id = ${storyId}
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
                    // Handle image uploads (you'll need to implement file upload logic)
                    // For now, we'll just update the description
                    if (description) {
                        await client.sql`
                            UPDATE picture_stories 
                            SET content = ${description}
                            WHERE story_id = ${storyId}
                        `;
                    }
                }
                break;

            case 'audio':
                const audioFile = formData.get('audio') as File;
                if (audioFile) {
                    // Handle audio file upload (you'll need to implement file upload logic)
                    // For now, we'll just update the description
                    if (description) {
                        // Note: You might want to store description in a separate field
                        // or handle it differently for audio stories
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

 