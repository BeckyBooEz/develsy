import Image from "next/image"
import { Perfil } from "../data/DataCv"

interface Props {
    perfil: Perfil
}

export default function CurriculumPerfil({ perfil }: Props) {
    return (
        <div>
            <div>
                <Image src={"/img/perfilarturo.webp"} alt="FotoPerfil" width={400} height={400} />
            </div>
            <div>
                <p>{perfil.nombre}</p>
                <p>{perfil.profesion}</p>
                <p>{perfil.correo}</p>
                <p>{perfil.telefono}</p>
                <p>{perfil.ubicacion}</p>
                <p>{perfil.resumen}</p>
            </div>
        </div>
    )
}