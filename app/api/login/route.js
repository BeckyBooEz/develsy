import { NextResponse } from "next/server";

export async function GET() {
    const url = `https://accounts.spotify.com/authorize` +
        `?response_type=code` +
        `&client_id=${process.env.SPOTIFY_CLIENT_ID}` +
        `&scope=${encodeURIComponent(
            "user-read-recently-played user-top-read user-read-private user-read-email"
        )}` +
        `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;

    return NextResponse.redirect(url);
}