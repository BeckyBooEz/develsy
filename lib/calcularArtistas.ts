interface TrackItem {
    track: {
        artists: { id: string; name: string }[];
    };
}

interface ArtistaPeso {
    id: string;
    name: string;
    porcentaje: number;
}

export function calcularPesosArtistas(items: TrackItem[]): ArtistaPeso[] {
    const repeticiones: Record<string, { name: string; repit: number }> = {};

    items.forEach(item => {
        const artistas = item.track.artists;
        const colaboradores = artistas.slice(1);

        // Fix del edge case: si no hay colaboradores, sumaBruta sería 0
        const pesosBrutos = colaboradores.map((_, i) => 1 / (i + 1));
        const sumaBruta = pesosBrutos.reduce((a, b) => a + b, 0);
        const pesosNormalizados = sumaBruta > 0
            ? pesosBrutos.map(p => (p / sumaBruta) * 0.5)
            : [];

        artistas.forEach((artista, index) => {
            const peso = index === 0 ? 1.0 : (pesosNormalizados[index - 1] ?? 0);

            if (!repeticiones[artista.id]) {
                repeticiones[artista.id] = { name: artista.name, repit: 0 };
            }
            repeticiones[artista.id].repit += peso;
        });
    });

    const totalReps = Object.values(repeticiones).reduce((total, a) => total + a.repit, 0);

    return Object.entries(repeticiones)
        .map(([id, { name, repit }]) => ({
            id,
            name,
            porcentaje: (repit / totalReps) * 100
        }))
        .sort((a, b) => b.porcentaje - a.porcentaje);
}