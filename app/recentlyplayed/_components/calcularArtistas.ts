import type { Track, ArtistaConPeso } from "./types";

export function calcularArtistas(items: Track[]): ArtistaConPeso[] {
    const repeticiones: Record<string, { name: string; peso: number }> = {};

    items.forEach((item) => {
        const artistas = item.track.artists;
        const n = artistas.length;

        // [n, n-1, ..., 1]
        const pesosBrutos = artistas.map((_, i) => n - i);

        // suma total → n + (n-1) + ... + 1 = n*(n+1)/2
        const suma = pesosBrutos.reduce((acc, p) => acc + p, 0);

        // normalizar y acumular
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