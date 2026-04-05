"use client"

import { useState } from "react"

const secciones = [
    { id: "perfil", label: "Perfil" },
    { id: "educacion", label: "Educación" },
    { id: "experiencia", label: "Experiencia" },
    { id: "habilidades", label: "Habilidades" },
    { id: "redes", label: "Redes" },
]

export default function CurriculumHeader() {
    const [activo, setActivo] = useState("perfil")

    const scrollTo = (id: string) => {
        const main = document.querySelector("main")
        const target = document.getElementById(id)
        if (main && target) {
            main.scrollTo({ top: target.offsetTop, behavior: "smooth" })
        }
        setActivo(id)
    }

    return (
        <header className="w-full">
            <nav className="flex justify-center w-full py-2">
                {secciones.map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={`
                            text-[clamp(10px,1.5vw,13px)] font-medium px-3 py-1.5
                            whitespace-nowrap transition-all duration-200
                            border-b-2
                            ${activo === id
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-400 hover:text-gray-600"
                            }
                        `}
                    >
                        {label}
                    </button>
                ))}
            </nav>
        </header>
    )
}