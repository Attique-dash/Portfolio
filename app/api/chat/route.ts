import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    try {
        const body = await req.json();

        if (!body.message) {
            return NextResponse.json({ error: 'Missing message in request body' }, { status: 400 });
        }

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-r1-0528:free',
                messages: [
                    {
                        role: 'system',
                        content:
                            "You are a helpful AI assistant on Muhammad Attique's portfolio website. Your primary goal is to provide accurate information about Muhammad Attique's skills, education, experience, and projects. However, if a user asks a general knowledge question not related to his portfolio, you should still try to answer it to the best of your ability.",
                    },
                    {
                        role: 'user',
                        content: body.message,
                    },
                ],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('OpenRouter API error:', data);

            if (data.error?.code === 402) {
                return NextResponse.json(
                    { error: 'Service temporarily unavailable. Please try again later.' },
                    { status: 503 }
                );
            }

            return NextResponse.json(
                { error: data?.error?.message || 'Chat failed. Please try again.' },
                { status: response.status }
            );
        }

        const reply = data.choices?.[0]?.message?.content;

        return NextResponse.json({ reply: reply });
    } catch (err: Error | unknown) {
        console.error('Server Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}