import { Curriculum } from "./types"

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
        },
        redes: [
            { red: "Instagram", link: "https://www.instagram.com/Arturo.Miranda.Ez/", img: "/redes/instagram.svg" },
            { red: "Facebook", link: "https://www.facebook.com/Arturo.Miranda.Ez", img: "/redes/facebook.svg" },
            { red: "Linkedin", link: "https://www.linkedin.com/in/arturomirandaez/", img: "/redes/linkedin.svg" },
            { red: "Whatsapp", link: "https://api.whatsapp.com/send?phone=522322208635", img: "/redes/whatsapp.svg" },
            { red: "Spotify", link: "https://open.spotify.com/user/22rllkn5pqe35vp65sjzpsp5i?si=fab80fd3bd2e401e", img: "/redes/spotify.svg" },
            { red: "Gmail", link: "mailto:Arturo.Miranda.Dev@gmail.com", img: "/redes/gmail.svg" },
            { red: "Tiktok", link: "https://www.tiktok.com/@arturo.miranda.ez", img: "/redes/tiktok.svg" },
            { red: "Steam", link: "https://steamcommunity.com/profiles/76561198334664881/", img: "/redes/steam.svg" }
        ]
    },
]