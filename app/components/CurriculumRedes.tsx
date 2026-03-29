import { Red } from "../data/DataCv"

interface Props {
    redes: Red[]
}

export default function CurriculumRedes({ redes }: Props) {
    return (
        <main className="flex flex-col">
            <div className="">
                <h1>Redes sociales</h1>
                <div className="flex gap-4">
                    {redes.map((red, index) => (
                        <ul key={index} >
                            <li className="bg-amber-50">
                                <a href={red.link} >
                                    <img src={red.img} alt="" width={50} height={50} />
                                </a>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </main>
    )
}