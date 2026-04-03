import Image from "next/image";
import { ArtistBar } from "./ArtistBar";
import type { UserHeaderProps } from "./types";

export function UserHeader({ user, top, artistsMap, porcentajeOtros }: UserHeaderProps) {
    return (
        <header style={{
            padding: "24px 32px",
            borderBottom: "1px solid #1a1a1a",
            background: "#111"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                {user.image && (
                    <a href={user.linkperfil} target="_blank" rel="noopener noreferrer">
                        <Image
                            src={user.image}
                            alt={user.name}
                            width={56}
                            height={56}
                            style={{ borderRadius: "50%", border: "2px solid #1DB954" }}
                        />
                    </a>
                )}
                <div>
                    <div className="flex items-center gap-2">
                        <p className="capitalize">{user.name}</p>
                        <p className="capitalize">{user.product}</p>
                    </div>
                    <p style={{ margin: 0, color: "#aaa", fontSize: "13px" }}>{user.email}</p>
                    <p style={{ margin: 0, color: "#1DB954", fontSize: "12px" }}>
                        {user.followers.toLocaleString()} Seguidores
                    </p>
                </div>
            </div>

            <ArtistBar
                top={top}
                artistsMap={artistsMap}
                porcentajeOtros={porcentajeOtros}
            />
        </header >
    );
}
