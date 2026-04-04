import type { Curriculum } from "./types"

interface Props {
    redes: Curriculum["redes"]
}

export default function CurriculumRedes({ redes }: Props) {
    return (
        <main className="flex flex-col w-full">
            <h1>Redes sociales</h1>
            <div className="grid gap-2 grid-cols-1 md:flex md:gap-4 md:justify-center">
                {redes.map((red, index) => (
                    <ul key={index} >
                        <li className="bg-indigo-600 p-3 rounded-full flex items-center gap-1">
                            <a href={red.link}>
                                <img src={red.img} alt="" width={50} height={50} />
                            </a>
                            <p className="pl-2">{red.red}</p>
                        </li>
                    </ul>
                ))}
            </div>
        </main>
    )
}