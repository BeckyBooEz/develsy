import Image from "next/image";

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

export function TrackCard({ item, index }: TrackCardProps) {
    return (
        <div style={{
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
                <p style={{
                    margin: 0,
                    fontWeight: "bold",
                    fontSize: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}>
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
    );
}
