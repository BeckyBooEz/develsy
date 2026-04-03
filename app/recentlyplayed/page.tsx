import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";
import { spotifyFetch } from "@/lib/spotifyFetch";
import { LoginScreen } from "./_components/LoginScreen";
import { UserHeader } from "./_components/UserHeader";
import { TrackList } from "./_components/TrackList";
import type { User, Track, ArtistData } from "./_components/types";
import { calcularArtistas } from "./_components/calcularArtistas";

const getSpotifyUser = unstable_cache(
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

const getRecentTracks = unstable_cache(
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

export default async function RecentlyPlayed() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    console.log("[page] Token:", token ? "existe" : "NO existe");

    if (!token) return <LoginScreen />;

    const [userData, tracksData] = await Promise.all([
        getSpotifyUser(token),
        getRecentTracks(token)
    ]);

    if (!userData || !tracksData) {
        // Detectar si fue rate limit específicamente
        return <LoginScreen error="Spotify está limitando las requests temporalmente. Espera unos minutos e intenta de nuevo." />;
    }

    const user: User = {
        name: userData.display_name,
        email: userData.email,
        image: userData.images?.[0]?.url ?? null,
        linkperfil: userData.external_urls.spotify,
        followers: userData.followers?.total ?? 0,
        product: userData.product
    };

    const tracks: Track[] = (tracksData.items ?? []).map((item: Track) => ({
        played_at: item.played_at,
        track: {
            id: item.track.id,
            name: item.track.name,
            duration_ms: item.track.duration_ms,
            external_urls: item.track.external_urls,
            type: item.track.type,
            popularity: item.track.popularity,
            artists: item.track.artists.map((a) => ({
                id: a.id,
                name: a.name,
                external_urls: a.external_urls
            })),
            album: {
                album_type: item.track.album.album_type,
                name: item.track.album.name,
                release_date: item.track.album.release_date,
                total_tracks: item.track.album.total_tracks,
                type: item.track.album.type,
                images: item.track.album.images.map((img) => ({
                    url: img.url
                }))
            }
        }
    }));

    // Fix: pasar tracksData.items, no tracksData completo
    const artistasPeso = calcularArtistas(tracksData.items ?? []);
    const top7 = artistasPeso.slice(0, 7);
    const otros = artistasPeso.slice(7);
    const porcentajeOtros = otros.reduce((acc, a) => acc + a.porcentaje, 0);

    const artistsMap: Record<string, ArtistData> = {};

    if (top7.length > 0) {
        const ids = top7.map(a => a.id).join(",");
        const artistsRes = await spotifyFetch(`https://api.spotify.com/v1/artists?ids=${ids}`, token);
        console.log("[page] /artists status:", artistsRes?.status);

        if (artistsRes?.ok) {
            const artistsData = await artistsRes.json();
            (artistsData.artists ?? []).forEach((a: any) => {
                artistsMap[a.id] = {
                    id: a.id,
                    name: a.name,
                    image: a.images?.[0]?.url ?? null,
                    url: a.external_urls?.spotify ?? null
                };
            });
        }
    }

    console.log("[page] Render OK — tracks:", tracks.length, "| artistas top7:", top7.length);

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0a0a0a",
            color: "#fff",
            fontFamily: "'Segoe UI', sans-serif"
        }}>
            <UserHeader
                user={user}
                top7={top7}
                artistsMap={artistsMap}
                porcentajeOtros={porcentajeOtros}
            />
            <TrackList tracks={tracks} />
        </div>
    );
}
