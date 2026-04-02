import { TrackCard } from "./TrackCard";

import type { TrackListProps } from "./types";

export function TrackList({ tracks }: TrackListProps) {
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
                    <TrackCard key={item.track.id} item={item} index={index} />
                ))}
            </div>
        </main>
    );
}
