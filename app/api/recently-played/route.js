import { cookies } from "next/headers";
import { spotifyFetch } from "@/lib/spotifyFetch";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
        return Response.json({ error: "No autenticado" }, { status: 401 });
    }

    const now = Date.now();
    const response = await spotifyFetch(
        `https://api.spotify.com/v1/me/player/recently-played?limit=50&before=${now}`
    );

    if (!response || !response.ok) {
        return Response.json({ error: "Error al obtener canciones" }, { status: 500 });
    }

    const data = await response.json();

    return Response.json({
        items: data.items,
        total: data.items.length
    });
}