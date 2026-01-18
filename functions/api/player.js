export async function onRequest(context) {
  try {
    const { searchParams } = new URL(context.request.url);
    const username = searchParams.get('username');
    
    if (!username) {
      return new Response('Username required', { status: 400 });
    }
    
    const mojangRes = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${username}`
    );
    
    if (!mojangRes.ok) {
      return new Response('Player not found', { status: 404 });
    }
    
    const mojangData = await mojangRes.json();
    
    return new Response(JSON.stringify(mojangData.id), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    // Return the actual error so we can see what's wrong
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: error.stack 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}