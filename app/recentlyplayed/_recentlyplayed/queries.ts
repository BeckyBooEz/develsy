import { unstable_cache } from "next/cache";
import { spotifyFetch } from "@/lib/spotifyFetch";

export const getSpotifyUser = unstable_cache(
    async (token: string) => {
        const res = await spotifyFetch("https://api.spotify.com/v1/me", token);
        console.log("[page] /me status:", res?.status);
        if (res?.status === 429) {
            console.warn("[page] Rate limited en /me. Retry-After:", res.headers.get("Retry-After"), "s");
        }
        if (!res?.ok) return null;
        return res.json();
    },
    ["spotify-user"],
    { revalidate: 60 }
);

export const getRecentTracks = unstable_cache(
    async (token: string) => {
        const before = Math.floor(Date.now() / 60000) * 60000;
        const res = await spotifyFetch(
            `https://api.spotify.com/v1/me/player/recently-played?limit=50&before=${before}`,
            token
        );
        console.log("[page] /recently-played status:", res?.status);
        if (res?.status === 429) {
            console.warn("[page] Rate limited en /recently-played. Retry-After:", res.headers.get("Retry-After"), "s");
        }
        if (!res?.ok) return null;
        return res.json();
    },
    ["spotify-tracks"],
    { revalidate: 60 }
);