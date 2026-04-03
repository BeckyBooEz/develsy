import { cookies } from "next/headers";
import { spotifyFetch } from "@/lib/spotifyFetch";
import { LoginScreen } from "./_recentlyplayed/LoginScreen";
import { UserHeader } from "./_recentlyplayed/UserHeader";
import { TrackList } from "./_recentlyplayed/TrackList";
import type { User, Track, ArtistData } from "./_recentlyplayed/types";
import { calcularArtistas } from "./_recentlyplayed/calcularArtistas";
import { getSpotifyUser, getRecentTracks } from "./_recentlyplayed/queries";

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
            external_urls: item.track.external_urls.spotify,
            type: item.track.type,
            artists: item.track.artists.map((a) => ({
                id: a.id,
                name: a.name,
                external_urls: a.external_urls.spotify
            })),
            album: {
                name: item.track.album.name,
                release_date: item.track.album.release_date,
                total_tracks: item.track.album.total_tracks,
                images: item.track.album.images.map((img) => ({
                    url: img.url
                }))
            }
        }
    }));

    // Fix: pasar tracksData.items, no tracksData completo
    const artistasPeso = calcularArtistas(tracksData.items ?? []);
    const top = artistasPeso.slice(0, 5);

    const otros = artistasPeso.slice(5);
    const porcentajeOtros = otros.reduce((acc, a) => acc + a.porcentaje, 0);

    const artistsMap: Record<string, ArtistData> = {};

    if (top.length > 0) {
        const results = await Promise.all(
            top.map(a =>
                spotifyFetch(
                    `https://api.spotify.com/v1/artists/${a.id}`,
                    token
                )
            )
        );

        const artistsData = await Promise.all(
            results.map(async (res, i) => {
                if (!res?.ok) {
                    console.log("Error artista:", top[i].id, res?.status);
                    return null;
                }
                return res.json();
            })
        );

        artistsData
            .filter(Boolean)
            .forEach((a: any) => {
                artistsMap[a.id] = {
                    id: a.id,
                    name: a.name,
                    image: a.images?.[0]?.url ?? null,
                    url: a.external_urls?.spotify ?? null
                };
            });
    }

    console.log("[page] Render OK — tracks:", tracks.length, "| artistas top:", top.length);

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0a0a0a",
            color: "#fff",
            fontFamily: "'Segoe UI', sans-serif"
        }}>
            <UserHeader
                user={user}
                top={top}
                artistsMap={artistsMap}
                porcentajeOtros={porcentajeOtros}
            />
            <TrackList tracks={tracks} />
        </div>
    );
}
