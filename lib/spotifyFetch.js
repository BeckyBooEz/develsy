import { cookies } from "next/headers";

export async function spotifyFetch(url) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) return null;

    let response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
    });

    // Si el token expiró, refresheamos y reintentamos
    if (response.status === 401) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        await fetch(`${baseUrl}/api/refresh`);

        const newCookieStore = await cookies();
        const newToken = newCookieStore.get("access_token")?.value;

        response = await fetch(url, {
            headers: { Authorization: `Bearer ${newToken}` }
        });
    }

    return response;
}