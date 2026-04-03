import type { Track, ArtistaConPeso } from "./types";

export function calcularArtistas(items: Track[]): ArtistaConPeso[] {
    if (!items || items.length === 0) return [];

    const repeticiones: Record<string, { name: string; peso: number }> = {};

    items.forEach((item) => {
        const artistas = item.track.artists;
        const n = artistas.length;

        // Pesos: [n, n-1, ..., 1]
        const pesosBrutos = artistas.map((_, i) => n - i);
        const suma = pesosBrutos.reduce((acc, p) => acc + p, 0);

        artistas.forEach((artista, i) => {
            const peso = pesosBrutos[i] / suma;
            if (!repeticiones[artista.id]) {
                repeticiones[artista.id] = { name: artista.name, peso: 0 };
            }
            repeticiones[artista.id].peso += peso;
        });
    });

    const totalPeso = Object.values(repeticiones).reduce((acc, a) => acc + a.peso, 0);

    return Object.entries(repeticiones)
        .map(([id, { name, peso }]) => ({
            id,
            name,
            porcentaje: (peso / totalPeso) * 100
        }))
        .sort((a, b) => b.porcentaje - a.porcentaje);
}
