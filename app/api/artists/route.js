import { cookies } from "next/headers";

export async function GET(req) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
        return Response.json({ error: "No autenticado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids");

    if (!ids) {
        return Response.json({ error: "No se proporcionaron IDs" }, { status: 400 });
    }

    const artistasPromises = ids.split(",").map(id =>
        fetch(`https://api.spotify.com/v1/artists/${id.trim()}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.json())
    );

    const results = await Promise.all(artistasPromises);

    const artistas = results.map(artist => ({
        id: artist.id,
        name: artist.name,
        image: artist.images?.[0]?.url ?? null,
        url: artist.external_urls?.spotify ?? null
    }));

    return Response.json({ artists: artistas });
}