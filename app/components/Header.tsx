import Image from "next/image"

export default function Header() {
    return (
        <header className="flex flex-row justify-between items-center m-2">
            <Image src="/img/spotifylogo.svg" alt="SpotifyLogo" width={200} height={0} />
            <h1 className="text-3xl">Aprendiendo TSX</h1>
            <div className="flex flex-row items-center gap-2.5">
                <p className="text-lg">Arturo Miranda</p>
                <Image className="rounded-full" src="/img/perfilarturo.webp" alt="ArturoPerfil" width={80} height={80} />
            </div>
        </header>
    )
}