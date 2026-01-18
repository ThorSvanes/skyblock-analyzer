export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const username = searchParams.get('username');
  
  // Get UUID from Mojang
  const mojangRes = await fetch(
    `https://api.mojang.com/users/profiles/minecraft/${username}`
  );
  const { id } = await mojangRes.json();

  return new Response(JSON.stringify(id), {
    headers: { 'Content-Type': 'application/json' }
  });
}