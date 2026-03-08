export interface Curriculum {
    nombre: string
    profesion: string
    correo: string
    telefono: string
    ubicacion: string
    resumen: string

    educacion: Educacion[]
    experiencia: Experiencias[]
    idiomas: Idiomas[]

    habilidadesblandas: string[]
    habilidaesDuras: HabDuras[]
}

export interface Educacion {
    escuela: string
    nivel: string
    fechas: string
}

export interface Idiomas {
    lengua: string
    nivel: string
}

export interface Experiencias {
    entidad: string
    puesto: string
    fechas: string
    funciones: string[]
}

export interface HabDuras {
    habilidad: string
    nivel: string
}

export const miCV: Curriculum = {
    nombre: "Arturo Miranda",
    profesion: "Licenciatura En Contaduría Pública",
    correo: "Arturo.Miranda.Dev@gmail.com",
    telefono: "+52 232 220 86 35",
    ubicacion: "Ciudad de México, México",
    resumen: "Soy una persona autodidacta",
    educacion: [
        {
            escuela: "Benemerita Universidad Autonoma de Puebla",
            nivel: "Universidad",
            fechas: "2021-2025"
        }
    ],
    experiencia: [
        {
            entidad: "H. Ayuntamiento de Zacapoaxtla",
            puesto: "Servicio Social y Practicas Profesionales",
            fechas: "2023-2024",
            funciones: [
                "Realizar coincialiaciones de combustible",
                "Realizar otras pendejadas."
            ]
        },
        {
            entidad: "EY México",
            puesto: "Staff asurrent",
            fechas: "2025-Actualmente",
            funciones: [
                "Revisión y análisis de registros contables",
                "Conciliaciones bancarias",
                "Elaboración de papeles de trabajo para auditoría",
                "Revisión de estados financieros",
                "Apoyo en cumplimiento de obligaciones fiscales",
                "Análisis de variaciones y control interno",
                "Preparación de reportes financieros",
                "Revisión de documentación soporte de operaciones",
                "Apoyo en procesos de cierre contable",
                "Comunicación de hallazgos y observaciones"
            ]
        }
    ],
    idiomas: [
        {
            lengua: "Ingles",
            nivel: "A2"
        }
    ],
    habilidadesblandas: [
        "Liderazgo",
        "Escucha activa"
    ],
    habilidaesDuras: [
        {
            habilidad: "excel",
            nivel: "Intermadio"
        },
        {
            habilidad: "Python",
            nivel: "Bajo"
        }
    ]
}