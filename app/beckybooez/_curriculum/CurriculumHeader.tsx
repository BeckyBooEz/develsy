"use client"

export default function CurriculumHeader() {
    const scrollTo = (id: string) => {
        const main = document.querySelector("main")
        const target = document.getElementById(id)
        if (main && target) {
            main.scrollTo({ top: target.offsetTop, behavior: "smooth" })
        }
    }

    const btnclass = "font-bold py-1 px-2 text-xs sm:text-base"

    return (
        <header className="w-full">
            <nav className="flex flex-wrap gap-2 p-3 justify-center w-full">
                <button className={btnclass} onClick={() => scrollTo("perfil")}>Perfil</button>
                <button className={btnclass} onClick={() => scrollTo("educacion")}>Educación</button>
                <button className={btnclass} onClick={() => scrollTo("experiencia")}>Experiencia</button>
                <button className={btnclass} onClick={() => scrollTo("habilidades")}>Habilidades</button>
                <button className={btnclass} onClick={() => scrollTo("redes")}>Redes</button>
            </nav>
        </header>
    )
}