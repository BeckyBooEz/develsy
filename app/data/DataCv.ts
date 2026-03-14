export interface Curriculum {
    perfil: Perfil
    educacion: Educacion[]
    experiencias: Experiencias[]
    habilidades: Habilidades
}

export interface Perfil {
    nombre: string
    profesion: string
    correo: string
    telefono: string
    ubicacion: string
    resumen: string
}

export interface Educacion {
    escuela: string
    nivel: string
    fechas: string
}

export interface Experiencias {
    entidad: string
    puesto: string
    fechas: string
    funciones: string[]
}

export interface Habilidades {
    idiomas: Idiomas[]
    blandas: string[]
    duras: Duras[]
}

export interface Idiomas {
    lengua: string
    nivel: string
}

export interface Duras {
    habilidad: string
    nivel: string
}

export const miCV: Curriculum = {
    perfil: {
        nombre: "Arturo Miranda",
        profesion: "Licenciatura En Contaduría Pública",
        correo: "Arturo.Miranda.Dev@gmail.com",
        telefono: "+52 232 220 86 35",
        ubicacion: "Ciudad de México, México",
        resumen: "Soy una persona autodidacta",
    },
    educacion: [
        {
            escuela: "Benemerita Universidad Autonoma de Puebla",
            nivel: "Universidad",
            fechas: "2021-2025",
        },
    ]
    ,
    experiencias: [
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
    habilidades: {
        idiomas: [
            {
                lengua: "Ingles",
                nivel: "A2"
            }
        ],
        blandas: [
            "Liderazgo",
            "Escucha activa",
        ],
        duras: [
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
}