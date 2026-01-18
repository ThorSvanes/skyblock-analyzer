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
    
    const playerData = await response.json();

    if (!playerData.success) {
      return new Response('Player not found', { status: 404 });
    }
    
    const uuid = playerData.data.player.id.replace(/-/g, ''); // Remove dashes
    
    // Get Hypixel SkyBlock data
    const hypixelRes = await fetch(
      `https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}`,
      {
        headers: {
          'API-Key': context.env.HYPIXEL_API_KEY
        }
      }
    );
    
    const hypixelData = await hypixelRes.json();
    
    return new Response(JSON.stringify(hypixelData), {
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