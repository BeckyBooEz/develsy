import { cookies } from "next/headers";
import { spotifyFetch } from "@/lib/spotifyFetch";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
        return Response.json({ error: "No autenticado" }, { status: 401 });
    }

    const response = await spotifyFetch("https://api.spotify.com/v1/me");

    if (!response || !response.ok) {
        return Response.json({ error: "Error al obtener usuario" }, { status: 500 });
    }

    const data = await response.json();

    return Response.json({
        name: data.display_name,
        email: data.email,
        image: data.images?.[0]?.url ?? null,
        followers: data.followers?.total ?? 0
    });
}