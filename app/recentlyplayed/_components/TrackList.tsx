import { TrackCard } from "./TrackCard";
import type { TrackListProps } from "./types";

export function TrackList({ tracks }: TrackListProps) {
    if (tracks.length === 0) {
        return (
            <main style={{ padding: "32px" }}>
                <p style={{ color: "#aaa" }}>No hay canciones recientes.</p>
            </main>
        );
    }

    return (
        <main style={{ padding: "32px" }}>
            <h1 style={{ fontSize: "22px", marginBottom: "24px" }}>
                Últimas canciones escuchadas
                <span style={{ color: "#aaa", fontSize: "14px", fontWeight: "normal", marginLeft: "10px" }}>
                    ({tracks.length})
                </span>
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {tracks.map((item, index) => (
                    <TrackCard key={`${item.track.id}-${item.played_at}`} item={item} index={index} />
                ))}
            </div>
        </main>
    );
}
