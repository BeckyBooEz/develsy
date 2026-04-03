import Image from "next/image";
import { ArtistBar } from "./ArtistBar";
import type { UserHeaderProps } from "./types";

export function UserHeader({ user, top7, artistsMap, porcentajeOtros }: UserHeaderProps) {
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
                    <h2 style={{ textTransform: "capitalize", margin: 0, fontSize: "18px" }}>
                        {user.name}
                        <span style={{ color: "#1DB954", fontSize: "13px", fontWeight: "normal", marginLeft: "8px" }}>
                            {user.product}
                        </span>
                    </h2>
                    <p style={{ margin: 0, color: "#aaa", fontSize: "13px" }}>{user.email}</p>
                    <p style={{ margin: 0, color: "#1DB954", fontSize: "12px" }}>
                        {user.followers.toLocaleString()} Seguidores
                    </p>
                </div>
            </div>

            <ArtistBar
                top7={top7}
                artistsMap={artistsMap}
                porcentajeOtros={porcentajeOtros}
            />
        </header>
    );
}
