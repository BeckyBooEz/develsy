"use client"

import { useState } from "react";
import CancionCard, { Cancion } from "./CancionCard";

interface cancionContainerProps {
    canciones: Cancion[]
}

export default function CancionContainer({ canciones }: cancionContainerProps) {
    const [filtro, setFiltro] = useState("");

    const cancionesFiltradas = canciones.filter((cancion) =>
        cancion.Artista.toLowerCase().includes(filtro.toLowerCase())
        || cancion["Álbum"].toLowerCase().includes(filtro.toLowerCase())
        || cancion["Canción"].toLowerCase().includes(filtro.toLowerCase())
    );
    return (
        <div className="flex flex-col gap-2">
            <input className="text-red-300"
                type="text"
                placeholder="Buscar"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cancionesFiltradas.map((cancion, idx) => (
                    <CancionCard key={idx} cancion={cancion} />
                ))}
            </div>
        </div>
    )
}