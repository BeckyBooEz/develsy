import { cookies } from "next/headers";

/**
 * Wrapper de fetch para la API de Spotify.
 * 
 * El token puede pasarse directamente como argumento (requerido cuando
 * se llama desde dentro de unstable_cache, donde cookies() no está permitido).
 * Si no se pasa, lo lee de las cookies automáticamente.
 */
export async function spotifyFetch(url, tokenOverride) {
    let token = tokenOverride;

    if (!token) {
        const cookieStore = await cookies();
        token = cookieStore.get("access_token")?.value;
    }

    if (!token) {
        console.warn("[spotifyFetch] No hay token disponible para:", url);
        return null;
    }

    return fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
