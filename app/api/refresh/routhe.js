import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
        return Response.json({ error: "No hay refresh token" }, { status: 401 });
    }

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);
    params.append("client_id", process.env.SPOTIFY_CLIENT_ID);
    params.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
    });

    const data = await response.json();

    if (!data.access_token) {
        return Response.json({ error: "No se pudo renovar el token" }, { status: 400 });
    }

    const isProd = process.env.NODE_ENV === "production";
    const res = NextResponse.json({ ok: true });

    res.cookies.set("access_token", data.access_token, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/"
    });

    // Spotify a veces devuelve un nuevo refresh_token
    if (data.refresh_token) {
        res.cookies.set("refresh_token", data.refresh_token, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/"
        });
    }

    return res;
}