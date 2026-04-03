"use client"

export default function CurriculumHeader() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <header className="w-full">
            <nav className="flex gap-6 p-4">
                <button onClick={() => scrollTo("perfil")}>Perfil</button>
                <button onClick={() => scrollTo("educacion")}>Educación</button>
                <button onClick={() => scrollTo("experiencia")}>Experiencia</button>
                <button onClick={() => scrollTo("habilidades")}>Habilidades</button>
                <button onClick={() => scrollTo("redes")}>Redes</button>
            </nav>
        </header>
    )
}