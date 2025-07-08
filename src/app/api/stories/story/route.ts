//route for stroy creation.
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
    const session = await getSession(request);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string; // HTML from rich text editor
    const tagsRaw = formData.get('tags') as string | null;
    let tags: string[] = [];
    if (tagsRaw) {
        try {
            tags = JSON.parse(tagsRaw);
        } catch {
            tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
        }
    }

    if (!title || !description) {
        return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    const client = await db.connect();
    try {
        const userRes = await client.sql`SELECT id FROM profile WHERE email = ${session.user.email}`;
        if (userRes.rows.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const user_id = userRes.rows[0].id;

        // Insert into stories
        const { rows } = await client.sql`
            INSERT INTO stories (user_id, title, type, tags, status)
            VALUES (${user_id}, ${title}, 'story', ${'{' + tags.map(tag => `"${tag}"`).join(',') + '}'}, 'draft')
            RETURNING id
        `;
        const storyId = rows[0].id;

        // Insert into text_stories
        await client.sql`
            INSERT INTO text_stories (story_id, content)
            VALUES (${storyId}, ${description})
        `;

        return NextResponse.json({ message: 'Text story uploaded', storyId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    } finally {
        await client.release();
    }
}