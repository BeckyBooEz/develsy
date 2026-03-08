import { Curriculum } from "../data/micv"

interface Props {
    miCV: Curriculum
}

export default function CurriculumArturo({ miCV }: Props) {
    return (
        <div>
            <div>
                <p>{miCV.nombre}</p>
                <p>{miCV.profesion}</p>
                <p>{miCV.correo}</p>
                <p>{miCV.telefono}</p>
                <p>{miCV.resumen}</p>
            </div>
            <div>
                <p>Educación</p>
                {miCV.educacion.map((educacion, index) => (
                    <div key={index}>
                        <p>{educacion.escuela}</p>
                        <p>{educacion.nivel}</p>
                        <p>{educacion.fechas}</p>
                    </div>
                ))}
            </div>
            <div>
                <p>Experiencia</p>
                {miCV.experiencia.map((experiencia, index) => (
                    <div key={index}>
                        <p>{experiencia.entidad}</p>
                        <p>{experiencia.fechas}</p>
                        <ul>
                            {experiencia.funciones.map((funcion, index) => (
                                <li key={index}>{funcion}</li>
                            ))}
                        </ul>
                        <p>{experiencia.puesto}</p>
                    </div>
                ))}
            </div>
            <div>
                <p>Idiomas</p>
                {miCV.idiomas.map((idioma, index) => (
                    <div key={index}>
                        <p>{idioma.lengua}</p>
                        <p>{idioma.nivel}</p>
                    </div>
                ))}
            </div>
            <div>
                <p>Habiliades</p>
                <div>
                    {miCV.habilidadesblandas.map((blanda, index) => (
                        <p key={index}>{blanda}</p>
                    ))}
                </div>
                <div>
                    {miCV.habilidaesDuras.map((dura, index) => (
                        <div key={index}>
                            <p>{dura.habilidad}</p>
                            <p>{dura.nivel}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}