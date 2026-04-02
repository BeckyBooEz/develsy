export interface Track {
    track: SpotifyTrack;
    played_at: string;
}

interface SpotifyTrack {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    duration_ms: number;
    external_urls: { spotify: string };
    id: string;
    name: string;
    type: string;
}

interface SpotifyAlbum {
    album_type: string;
    images: { url: string; }[];
    name: string;
    release_date: string;
    total_tracks: number;
    type: string;
}

interface SpotifyArtist {
    external_urls: { spotify: string };
    id: string;
    name: string;
}

export interface User {
    name: string;
    email: string;
    image: string | null;
    linkperfil: string;
    followers: number;
    product: string;
}

export interface ArtistData {
    id: string;
    name: string;
    image: string | null;
    url: string;
}

export interface ArtistaConPeso {
    id: string;
    name: string;
    porcentaje: number;
}

export interface ArtistBarProps {
    top7: ArtistaConPeso[];
    artistsMap: Record<string, ArtistData>;
    porcentajeOtros: number;
}

export interface LoginScreenProps {
    error?: string;
}

export interface TrackCardProps {
    item: Track;
    index: number;
}

export interface UserHeaderProps {
    user: User;
    top7: ArtistaConPeso[];
    artistsMap: Record<string, ArtistData>;
    porcentajeOtros: number;
}

export interface TrackListProps {
    tracks: Track[];
}