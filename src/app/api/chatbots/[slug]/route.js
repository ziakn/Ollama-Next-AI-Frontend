'use server';


const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:5000/api';

export async function GET(request, { params }) {
  const { slug } = (params);

  try {
    const response = await fetch(`${BASE_URL}/${slug}`);

    if (!response.ok) {
      return new Response('Failed to fetch agent from backend', { status: 500 });
    }

    const agent = await response.json();
    return Response.json(agent);
  } catch (error) {
    console.error('API error (GET):', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request, { params }) {
    const { slug } = (params);
  
  
    const { input } = await request.json();
  
    try {
      const response = await fetch(`${BASE_URL}/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });
  
      if (!response.ok) {
        return new Response('Failed to fetch response from Flask backend', { status: 500 });
      }
  
      const result = await response.json();
      return Response.json({ output: result.summary || result });
    } catch (error) {
      console.error('API error (POST):', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
  