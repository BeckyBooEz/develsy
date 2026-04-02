import { cookies } from "next/headers";

async function refreshAccessToken() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) return null;

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);
    params.append("client_id", process.env.SPOTIFY_CLIENT_ID);
    params.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
    });

    const data = await response.json();
    return data.access_token ?? null;
}

export async function spotifyFetch(url) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) return null;

    let response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
    });

    // Si el token expiró, lo renovamos directo sin fetch interno
    if (response.status === 401) {
        const newToken = await refreshAccessToken();
        if (!newToken) return null;

        response = await fetch(url, {
            headers: { Authorization: `Bearer ${newToken}` }
        });
    }

    return response;
}
