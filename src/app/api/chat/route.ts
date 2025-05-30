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
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content:
              "You are a helpful assistant on Muhammad Attique's portfolio website. Answer questions clearly about his skills, education, experience, and projects.",
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
      
      // Handle specific OpenRouter API errors
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

    return NextResponse.json({ message: reply });
  } catch (err: any) {
    console.error('Server Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
