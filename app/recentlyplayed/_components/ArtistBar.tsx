import Image from "next/image";
import type { ArtistBarProps } from "./types";

export function ArtistBar({ top7, artistsMap, porcentajeOtros }: ArtistBarProps) {
    return (
        <div>
            <p style={{
                margin: "0 0 12px",
                color: "#aaa",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "1px"
            }}>
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
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                textAlign: "center",
                                width: "90px"
                            }}
                        >
                            {data?.image && (
                                <Image
                                    src={data.image}
                                    alt={artista.name}
                                    width={72}
                                    height={72}
                                    style={{
                                        borderRadius: "50%",
                                        display: "block",
                                        margin: "0 auto 6px",
                                        border: "2px solid #1DB954"
                                    }}
                                />
                            )}
                            <p style={{
                                margin: "0 0 2px",
                                fontSize: "11px",
                                fontWeight: "bold",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                            }}>
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
    );
}
