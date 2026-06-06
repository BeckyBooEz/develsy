import { Curriculum } from "./types"

export const DataCv: Curriculum[] = [
    {
        id: "AMD",
        perfil: {
            nombre: "Arturo Miranda Del Carmen",
            profesion: "Contador Público y Auditor",
            correo: "Arturo.Miranda.Dev@gmail.com",
            telefono: "+52 232 220 86 35",
            ubicacion: "Ciudad de México, México",
            resumen: "Contador Público con experiencia en auditoría financiera, enfocado en revisión de información contable, conciliaciones y elaboración de papeles de trabajo. Destaco por mi capacidad analítica, atención al detalle y comprensión de procesos financieros. Manejo avanzado de Excel y Power BI para análisis de datos, con conocimientos básicos en Python y SQL.",
        },
        educacion: [
            {
                escuela: "Benemérita Universidad Autónoma de Puebla",
                nivel: "Licenciatura",
                titulo: "Contaduría Pública y Auditoría",
                fechas: "2021-2025",
            },
            {
                escuela: "Centro de Estudios Tecnológicos Industrial y de Servicios No. 145",
                nivel: "Educación Media Superior",
                titulo: "Técnico en Contabilidad",
                fechas: "2017-2021",
            },
        ],
        experiencias: [
            {
                entidad: "EY México",
                puesto: "Staff de Auditoría",
                fechas: "Noviembre 2024-Actualidad",
                funciones: [
                    "Análisis y revisión de registros contables validando su correcta aplicación conforme a NIA y NIIF vigentes.",
                    "Elaboración y depuración de conciliaciones bancarias, identificando variaciones, documentando soluciones y proponiendo ajustes.",
                    "Preparación y documentación de papeles de trabajo estructurados para soportar procedimientos de auditoría.",
                    "Apoyo en la ejecución de pruebas sustantivas y de control, asegurando el cumplimiento de los procedimientos establecidos.",
                ],
            },
            {
                entidad: "H. Ayuntamiento de Zacapoaxtla",
                puesto: "Servicio Social y Prácticas Profesionales",
                fechas: "Mayo 2024-Abril 2025",
                funciones: [
                    "Elaboración y control de conciliaciones operativas (combustible), asegurando consistencia en registros.",
                    "Revisión de informes financieros y apoyo en auditorías internas.",
                    "Apoyo en actividades administrativas y procesos de control interno.",
                    "Seguimiento y actualización de reportes internos para control y supervisión.",
                ],
            },
        ],
        habilidades: {
            idiomas: [
                { lengua: "Inglés", nivel: "A2 (básico — lectura técnica)" },
            ],
            blandas: [
                "Pensamiento analítico",
                "Atención al detalle",
                "Resolución de problemas",
                "Trabajo en equipo",
                "Comunicación efectiva y escucha activa",
                "Organización y gestión del tiempo",
                "Inteligencia emocional",
                "Liderazgo colaborativo",
                "Adaptabilidad",
                "Aprendizaje ágil y orientación a resultados",
            ],
            duras: [
                { habilidad: "Microsoft Excel (Análisis de datos, tablas dinámicas y funciones avanzadas)", nivel: "Avanzado" },
                { habilidad: "Microsoft Office 365", nivel: "Avanzado" },
                { habilidad: "Power BI (Modelado de datos y visualización)", nivel: "Intermedio" },
                { habilidad: "Aspel COI, SUA, DIOT — Software contable", nivel: "Intermedio" },
                { habilidad: "HTML, CSS y JavaScript (Front-End, APIs)", nivel: "Intermedio" },
                { habilidad: "Python (Manipulación y análisis básico de datos)", nivel: "Básico" },
                { habilidad: "SQL (Fundamentos de consultas y bases de datos relacionales)", nivel: "Básico" },
            ],
        },
        cursos: [
            { nombre: "Design Thinking", institucion: "BBVA", fecha: "Mayo 2022" },
            { nombre: "Taller: Habilidades blandas y liderazgo", institucion: "BUAP", fecha: "Marzo 2023" },
            { nombre: "Congreso: Aplicación de Reformas Fiscales", institucion: "BUAP", fecha: "Enero 2023" },
            { nombre: "Charla: Prepárate para una emergencia", institucion: "BBVA", fecha: "Marzo 2024" },
            { nombre: "Congreso: Potenciando al Emprendedor", institucion: "BUAP", fecha: "Marzo 2024" },
            { nombre: "Curso de Front-End Development", institucion: "DEVF", fecha: "Diciembre 2024" },
            { nombre: "Python + SQL + Tableau: Integrating Python, SQL, and Tableau", institucion: "Udemy — 365 Careers", fecha: "Febrero 2026" },
            { nombre: "Statistics/Data Analysis in SPSS: Inferential Statistics", institucion: "Udemy — Quantitative Specialists", fecha: "Mayo 2026" },
        ],
        redes: [
            { red: "Instagram", link: "https://www.instagram.com/Arturo.Miranda.Ez/", img: "/redes/instagram.svg" },
            { red: "Facebook", link: "https://www.facebook.com/Arturo.Miranda.Ez", img: "/redes/facebook.svg" },
            { red: "Linkedin", link: "https://www.linkedin.com/in/arturomirandaez/", img: "/redes/linkedin.svg" },
            { red: "Whatsapp", link: "https://api.whatsapp.com/send?phone=522322208635", img: "/redes/whatsapp.svg" },
            { red: "Spotify", link: "https://open.spotify.com/user/22rllkn5pqe35vp65sjzpsp5i?si=fab80fd3bd2e401e", img: "/redes/spotify.svg" },
            { red: "Gmail", link: "mailto:Arturo.Miranda.Dev@gmail.com", img: "/redes/gmail.svg" },
            { red: "Tiktok", link: "https://www.tiktok.com/@arturo.miranda.ez", img: "/redes/tiktok.svg" },
            { red: "Steam", link: "https://steamcommunity.com/profiles/76561198334664881/", img: "/redes/steam.svg" },
        ],
    },
]