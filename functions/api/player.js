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
    
    // Return the status code so we can see what's happening
    return new Response(JSON.stringify({
      mojangStatus: mojangRes.status,
      mojangOk: mojangRes.ok,
      username: username,
      url: `https://api.mojang.com/users/profiles/minecraft/${username}`
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