export async function POST(request: Request) {
  const rawBody = await request.text();
  return Response.json({ rawBody });
}
