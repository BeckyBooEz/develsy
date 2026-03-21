export interface Curriculum {
    id: string
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
    titulo: string
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

export const DataCv: Curriculum[] = [
    {
        id: "AMD",
        perfil: {
            nombre: "Arturo Miranda del Carmen",
            profesion: "Contador Público | Auditoría y Finanzas",
            correo: "Arturo.Miranda.Dev@gmail.com",
            telefono: "+52 232 220 86 35",
            ubicacion: "Ciudad de México, México",
            resumen: "Estudiante de Contaduría Pública y Auditoría con experiencia en revisión de información financiera, conciliaciones y elaboración de papeles de trabajo. Destaco por mi capacidad analítica, atención al detalle y enfoque en la mejora de procesos mediante herramientas tecnológicas. Interesado en desarrollarme profesionalmente en auditoría y contabilidad financiera."
        },
        educacion: [
            {
                escuela: "Benemérita Universidad Autónoma de Puebla",
                nivel: "Licenciatura",
                titulo: "Contaduría Pública y Auditoría",
                fechas: "2021-2025"
            },
            {
                escuela: "Centro de Estudios Tecnológicos Industrial y de Servicios No. 145",
                nivel: "Educación Media Superior",
                titulo: "Técnico en Contabilidad",
                fechas: "2017-2021"
            }
        ],
        experiencias: [
            {
                entidad: "EY México",
                puesto: "Staff de Auditoría",
                fechas: "2025-Actualidad",
                funciones: [
                    "Revisión y análisis de registros contables",
                    "Elaboración de conciliaciones bancarias",
                    "Preparación de papeles de trabajo para auditoría",
                    "Apoyo en procesos de auditoría financiera",
                    "Validación de información contable conforme a normativa"
                ]
            },
            {
                entidad: "H. Ayuntamiento de Zacapoaxtla",
                puesto: "Servicio Social y Prácticas Profesionales",
                fechas: "2023-2024",
                funciones: [
                    "Elaboración de conciliaciones de combustible",
                    "Apoyo en procesos administrativos y control de información",
                    "Gestión y organización de documentación",
                    "Seguimiento de registros y reportes internos"
                ]
            }
        ],
        habilidades: {
            idiomas: [
                { lengua: "Inglés", nivel: "A2 (básico)" }
            ],
            blandas: [
                "Liderazgo",
                "Escucha activa",
                "Trabajo en equipo",
                "Organización",
                "Responsabilidad"
            ],
            duras: [
                { habilidad: "Excel", nivel: "Intermedio" },
                { habilidad: "Python", nivel: "Básico" }
            ]
        }
    },
    {
        id: "LRM",
        perfil: {
            nombre: "Luis Ricardo Méndez",
            profesion: "Ingeniero en Software y Analista de Datos",
            correo: "luis.mendez.falso@gmail.com",
            telefono: "+52 555 987 6543",
            ubicacion: "Guadalajara, México",
            resumen: "Soy un profesional con experiencia en desarrollo de software, análisis de datos y gestión de proyectos tecnológicos. Me enfoco en soluciones eficientes y en mejorar procesos mediante automatización y análisis estratégico."
        },
        educacion: [
            {
                escuela: "Universidad de Guadalajara",
                nivel: "Licenciatura en Ingeniería en Sistemas Computacionales",
                titulo: "",
                fechas: "2016-2020"
            },
            {
                escuela: "Universidad Panamericana",
                nivel: "Maestría en Inteligencia Artificial",
                titulo: "",
                fechas: "2021-2023"
            },
            {
                escuela: "Coursera / Udemy",
                nivel: "Certificaciones Online",
                titulo: "",
                fechas: "2020-2023"
            }
        ],
        experiencias: [
            {
                entidad: "TechSolutions S.A. de C.V.",
                puesto: "Desarrollador Full Stack",
                fechas: "2020-2022",
                funciones: [
                    "Desarrollo de aplicaciones web con React y Node.js",
                    "Implementación de API REST y GraphQL",
                    "Mantenimiento y optimización de bases de datos PostgreSQL y MongoDB",
                    "Colaboración en proyectos ágiles con Scrum",
                    "Documentación y control de versiones usando Git"
                ]
            },
            {
                entidad: "DataAnalytics MX",
                puesto: "Analista de Datos Senior",
                fechas: "2022-2024",
                funciones: [
                    "Extracción y limpieza de datos masivos",
                    "Creación de dashboards en Power BI y Tableau",
                    "Automatización de procesos de reporteo con Python",
                    "Aplicación de técnicas de machine learning para análisis predictivo",
                    "Análisis de KPIs y reportes para la dirección estratégica",
                    "Auditoría interna de calidad de datos"
                ]
            },
            {
                entidad: "FinTech Innovators",
                puesto: "Consultor de Procesos Tecnológicos",
                fechas: "2024-Actualmente",
                funciones: [
                    "Evaluación y mejora de procesos internos mediante software",
                    "Integración de herramientas de automatización",
                    "Asesoría en transformación digital",
                    "Capacitación de equipos en nuevas tecnologías",
                    "Gestión de proyectos bajo metodologías ágiles"
                ]
            }
        ],
        habilidades: {
            idiomas: [
                { lengua: "Inglés", nivel: "C1" },
                { lengua: "Español", nivel: "Nativo" },
                { lengua: "Francés", nivel: "A2" }
            ],
            blandas: [
                "Liderazgo",
                "Comunicación efectiva",
                "Resolución de problemas",
                "Trabajo en equipo",
                "Pensamiento estratégico"
            ],
            duras: [
                { habilidad: "Python", nivel: "Avanzado" },
                { habilidad: "Excel", nivel: "Avanzado" },
                { habilidad: "SQL", nivel: "Avanzado" },
                { habilidad: "React.js", nivel: "Intermedio" },
                { habilidad: "Node.js", nivel: "Intermedio" },
                { habilidad: "Power BI", nivel: "Intermedio" },
                { habilidad: "Machine Learning", nivel: "Intermedio" },
                { habilidad: "Git", nivel: "Intermedio" },
                { habilidad: "Docker", nivel: "Básico" }
            ]
        }
    }
]