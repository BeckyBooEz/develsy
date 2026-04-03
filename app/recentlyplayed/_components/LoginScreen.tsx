import type { LoginScreenProps } from "./types";

export function LoginScreen({ error }: LoginScreenProps) {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            color: "#fff",
            fontFamily: "'Segoe UI', sans-serif",
            gap: "16px"
        }}>
            {error ? (
                <>
                    <p style={{ color: "#e05555", margin: 0 }}>{error}</p>
                    <a href="/api/login" style={btnStyle}>
                        Volver a iniciar sesión
                    </a>
                </>
            ) : (
                <>
                    <p style={{ color: "#aaa", marginBottom: "4px" }}>
                        No has iniciado sesión
                    </p>
                    <a href="/api/login" style={btnStyle}>
                        Iniciar sesión con Spotify
                    </a>
                </>
            )}
        </div>
    );
}

const btnStyle: React.CSSProperties = {
    background: "#1DB954",
    color: "#000",
    padding: "12px 28px",
    borderRadius: "999px",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "14px"
};
