export async function onRequest(context) {
  try {
    const { searchParams } = new URL(context.request.url);
    const username = searchParams.get('username');
    
    if (!username) {
      return new Response('Username required', { status: 400 });
    }
    
    const response = await fetch(
      `https://playerdb.co/api/player/minecraft/${username}`
    );
    
    const data = await response.json();

    // Return the status code so we can see what's happening
    return new Response(JSON.stringify({
        data 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}