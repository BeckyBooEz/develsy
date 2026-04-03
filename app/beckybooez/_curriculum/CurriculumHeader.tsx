"use client"

export default function CurriculumHeader() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }

    const btnclass = "text-white font-bold py-2 px-4"

    return (
        <header>
            <nav className="flex flex-wrap gap-3 p-4 justify-center">
                <button className={btnclass} onClick={() => scrollTo("perfil")}>Perfil</button>
                <button className={btnclass} onClick={() => scrollTo("educacion")}>Educación</button>
                <button className={btnclass} onClick={() => scrollTo("experiencia")}>Experiencia</button>
                <button className={btnclass} onClick={() => scrollTo("habilidades")}>Habilidades</button>
                <button className={btnclass} onClick={() => scrollTo("redes")}>Redes</button>
            </nav>
        </header >
    )
}