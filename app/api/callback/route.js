import { NextResponse } from "next/server";

export async function GET(req) {
    const code = new URL(req.url).searchParams.get("code");

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.REDIRECT_URI);
    params.append("client_id", process.env.SPOTIFY_CLIENT_ID);
    params.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
    });

    const data = await response.json();
    if (!data.access_token) {
        console.error(data);
        return new NextResponse("Error al iniciar sesión", { status: 400 });
    }

    const isProd = process.env.NODE_ENV === "production";

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = NextResponse.redirect(baseUrl);

    res.cookies.set("access_token", data.access_token, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/"
    });

    res.cookies.set("refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/"
    });
    console.log(res)
    return res;
}