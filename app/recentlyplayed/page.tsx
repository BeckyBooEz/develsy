import Image from "next/image";
import { cookies } from "next/headers";
import { calcularPesosArtistas } from "@/lib/calcularArtistas";
import { spotifyFetch } from "@/lib/spotifyFetch";

interface Track {
    track: {
        id: string;
        name: string;
        popularity: number;
        duration_ms: number;
        external_urls: { spotify: string };
        album: {
            name: string;
            images: { url: string }[];
            release_date: string;
        };
        artists: { id: string; name: string }[];
    };
    played_at: string;
    context: any;
}

interface User {
    name: string;
    email: string;
    image: string | null;
    followers: number;
}

interface ArtistData {
    id: string;
    name: string;
    image: string | null;
    url: string;
}

function calcularTiempo(played_at: string): string {
    const ahora = Date.now();
    const marcaTiempo = new Date(played_at).getTime();
    const diferencia = ahora - marcaTiempo;
    const segundosTotales = Math.floor(diferencia / 1000);

    const semanas = Math.floor(segundosTotales / (60 * 60 * 24 * 7));
    const dias = Math.floor((segundosTotales % (60 * 60 * 24 * 7)) / (60 * 60 * 24));
    const horas = Math.floor((segundosTotales % (60 * 60 * 24)) / (60 * 60));
    const minutos = Math.floor((segundosTotales % (60 * 60)) / 60);
    const segundos = segundosTotales % 60;

    if (semanas > 0) return `hace ${semanas} semana${semanas === 1 ? "" : "s"}`;
    if (dias > 0) return `hace ${dias} día${dias === 1 ? "" : "s"}`;
    if (horas > 0) return `hace ${horas} hora${horas === 1 ? "" : "s"}`;
    if (minutos > 0) return `hace ${minutos} minuto${minutos === 1 ? "" : "s"}`;
    return `hace ${segundos} segundo${segundos === 1 ? "" : "s"}`;
}

function convertirDuracion(durationMs: number): string {
    const totalSegundos = Math.floor(durationMs / 1000);
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${minutos}:${segundos.toString().padStart(2, "0")}`;
}

export default async function RecentlyPlayed() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
        return (
            <div style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#0a0a0a",
                color: "#fff",
                fontFamily: "sans-serif"
            }}>
                <p style={{ color: "#aaa", marginBottom: "16px" }}>No has iniciado sesión</p>
                <a href="/api/login" style={{
                    background: "#1DB954",
                    color: "#000",
                    padding: "12px 28px",
                    borderRadius: "999px",
                    fontWeight: "bold",
                    textDecoration: "none"
                }}>
                    Iniciar sesión con Spotify
                </a>
            </div>
        );
    }

    // Llamadas directas a Spotify — sin fetches internos
    const [userRes, tracksRes] = await Promise.all([
        spotifyFetch("https://api.spotify.com/v1/me"),
        spotifyFetch(`https://api.spotify.com/v1/me/player/recently-played?limit=50&before=${Date.now()}`)
    ]);

    if (!userRes?.ok || !tracksRes?.ok) {
        return (
            <div style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0a0a0a",
                color: "#fff"
            }}>
                <p>Error al obtener datos de Spotify. <a href="/api/login" style={{ color: "#1DB954" }}>Vuelve a iniciar sesión</a></p>
            </div>
        );
    }

    const userData = await userRes.json();
    const tracksData = await tracksRes.json();

    const user: User = {
        name: userData.display_name,
        email: userData.email,
        image: userData.images?.[0]?.url ?? null,
        followers: userData.followers?.total ?? 0
    };

    const tracks: Track[] = (tracksData.items ?? []).filter(
        (item: Track, index: number, self: Track[]) =>
            self.findIndex(i => i.track.id === item.track.id) === index
    );

    const artistasPeso = calcularPesosArtistas(tracks);
    const top7 = artistasPeso.slice(0, 7);
    const otros = artistasPeso.slice(7);
    const porcentajeOtros = otros.reduce((acc, a) => acc + a.porcentaje, 0);

    // Fetch de artistas directo a Spotify
    const artistsMap: Record<string, ArtistData> = {};

    if (top7.length > 0) {
        const ids = top7.map(a => a.id).join(",");
        const artistsRes = await spotifyFetch(`https://api.spotify.com/v1/artists?ids=${ids}`);

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

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0a0a0a",
            color: "#fff",
            fontFamily: "'Segoe UI', sans-serif"
        }}>

            {/* Header usuario */}
            <header style={{
                padding: "24px 32px",
                borderBottom: "1px solid #1a1a1a",
                background: "#111"
            }}>

                {/* Fila superior: avatar + datos usuario */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                    {user.image && (
                        <Image
                            src={user.image}
                            alt={user.name}
                            width={56}
                            height={56}
                            style={{ borderRadius: "50%", border: "2px solid #1DB954" }}
                        />
                    )}
                    <div>
                        <h2 style={{ margin: 0, fontSize: "18px" }}>{user.name}</h2>
                        <p style={{ margin: 0, color: "#aaa", fontSize: "13px" }}>{user.email}</p>
                        <p style={{ margin: 0, color: "#1DB954", fontSize: "12px" }}>
                            {user.followers.toLocaleString()} seguidores
                        </p>
                    </div>
                </div>

                {/* Top artistas con peso */}
                <div>
                    <p style={{ margin: "0 0 12px", color: "#aaa", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Artistas más escuchados
                    </p>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
                        {top7.map(artista => {
                            const data = artistsMap[artista.id];
                            return (
                                <a
                                    key={artista.id}
                                    href={data?.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none", color: "inherit", textAlign: "center", width: "90px" }}
                                >
                                    {data?.image && (
                                        <Image
                                            src={data.image}
                                            alt={artista.name}
                                            width={72}
                                            height={72}
                                            style={{ borderRadius: "50%", display: "block", margin: "0 auto 6px", border: "2px solid #1DB954" }}
                                        />
                                    )}
                                    <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: "bold", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {artista.name}
                                    </p>
                                    <p style={{ margin: "0 0 2px", fontSize: "11px", color: "#1DB954" }}>
                                        {artista.porcentaje.toFixed(1)}%
                                    </p>
                                </a>
                            );
                        })}

                        {/* Otros */}
                        {porcentajeOtros > 0 && (
                            <div style={{ textAlign: "center", width: "90px" }}>
                                <div style={{
                                    width: "72px",
                                    height: "72px",
                                    borderRadius: "50%",
                                    background: "#1a1a1a",
                                    border: "1px solid #333",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 6px",
                                    fontSize: "24px"
                                }}>
                                    +
                                </div>
                                <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: "bold" }}>Otros</p>
                                <p style={{ margin: 0, fontSize: "11px", color: "#555" }}>
                                    {porcentajeOtros.toFixed(1)}%
                                </p>
                            </div>
                        )}
                    </div>
                </div>

            </header>

            {/* Lista de canciones */}
            <main style={{ padding: "32px" }}>
                <h1 style={{ fontSize: "22px", marginBottom: "24px" }}>
                    Últimas canciones escuchadas
                    <span style={{ color: "#aaa", fontSize: "14px", fontWeight: "normal", marginLeft: "10px" }}>
                        ({tracks.length})
                    </span>
                </h1>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {tracks.map((item: Track, index: number) => (
                        <div key={item.track.id} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            background: "#111",
                            borderRadius: "12px",
                            padding: "12px 16px"
                        }}>
                            <span style={{ color: "#555", width: "24px", textAlign: "center", fontSize: "13px" }}>
                                {index + 1}
                            </span>

                            <Image
                                src={item.track.album.images[0]?.url}
                                alt={item.track.name}
                                width={48}
                                height={48}
                                style={{ borderRadius: "6px", flexShrink: 0 }}
                            />

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ margin: 0, fontWeight: "bold", fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {item.track.name}
                                </p>
                                <p style={{ margin: 0, color: "#aaa", fontSize: "12px" }}>
                                    {item.track.artists[0].name} · {item.track.album.name}
                                </p>
                            </div>

                            <div style={{ textAlign: "center", minWidth: "60px" }}>
                                <p style={{ margin: 0, color: "#1DB954", fontSize: "13px", fontWeight: "bold" }}>
                                    {item.track.popularity}
                                </p>
                                <p style={{ margin: 0, color: "#555", fontSize: "11px" }}>popular</p>
                            </div>

                            <p style={{ margin: 0, color: "#aaa", fontSize: "13px", minWidth: "40px", textAlign: "right" }}>
                                {convertirDuracion(item.track.duration_ms)}
                            </p>

                            <p style={{ margin: 0, color: "#555", fontSize: "12px", minWidth: "100px", textAlign: "right" }}>
                                {calcularTiempo(item.played_at)}
                            </p>

                            <a
                                href={item.track.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    background: "#1DB954",
                                    color: "#000",
                                    padding: "6px 14px",
                                    borderRadius: "999px",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                ▶ Escuchar
                            </a>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
