import { Curriculum } from "./types"

export const DataCv: Curriculum[] = [
    {
        id: "AMD",
        perfil: {
            nombre: "Arturo Miranda Del Carmen",
            profesion: "Auditor Staff · Contaduría Pública y Auditoría",
            correo: "arturo.miranda.dev@gmail.com",
            telefono: "+52 232 220 8635",
            ubicacion: "Ciudad de México, México",
            resumen: "Contador Público y Auditor con experiencia en firma Big Four. Especializado en revisión documental, conciliaciones y elaboración de papeles de trabajo. Perfil híbrido con manejo avanzado de Excel, Power Query y Power BI. Actualmente desarrollando proyectos de automatización de procesos e integración de tecnología en la práctica contable.",
        },
        educacion: [
            {
                escuela: "Benemérita Universidad Autónoma de Puebla",
                nivel: "Licenciatura",
                titulo: "Contaduría Pública y Auditoría",
                fechas: "2021 – 2025",
            },
        ],
        experiencias: [
            {
                entidad: "Ernst & Young (EY)",
                puesto: "Auditor Staff",
                fechas: "Nov 2025 – Actualidad",
                funciones: [
                    "Voucheo y validación de documentación soporte para muestras de auditoría.",
                    "Revisión de cuentas: efectivo y equivalentes, ingresos, ventas e inventarios.",
                    "Cálculo de suficiencias de pasivos e inventarios físicos presenciales.",
                    "Proyecto interno de automatización con Power Query orientado a tableros Power BI.",
                    "Apoyo en explicación de procedimientos al equipo de trabajo.",
                    "Aprendizaje continuo de módulos SAP S/4HANA.",
                ],
            },
            {
                entidad: "Presidencia Municipal de Zacapoaxtla",
                puesto: "Servicio Social y Prácticas Profesionales",
                fechas: "2023 – 2024",
                funciones: [
                    "Revisión de informes financieros y apoyo en auditorías internas.",
                    "Atención directa a contribuyentes y orientación en trámites fiscales.",
                    "Participación en procesos administrativos y mejora de gestión pública.",
                ],
            },
        ],
        habilidades: {
            idiomas: [
                { lengua: "Español", nivel: "Nativo" },
                { lengua: "Inglés", nivel: "En desarrollo" },
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
                { habilidad: "Power Query (Transformación y automatización de datos)", nivel: "Avanzado" },
                { habilidad: "Power BI (Modelado de datos y visualización)", nivel: "Intermedio" },
                { habilidad: "SAP S/4HANA", nivel: "Básico" },
                { habilidad: "SQL (Fundamentos de consultas y bases de datos relacionales)", nivel: "Básico" },
                { habilidad: "Python (Manipulación y análisis básico de datos)", nivel: "Básico" },
            ],
        },
        cursos: [
            { nombre: "SAP S/4HANA Training in Plain English", institucion: "Udemy", fecha: "Mayo 2026" },
            { nombre: "Statistics & Data Analysis in SPSS: Inferential Statistics", institucion: "Udemy — Quantitative Specialists", fecha: "Mayo 2026" },
            { nombre: "Python + SQL + Tableau: Integrating Python, SQL, and Tableau", institucion: "Udemy — 365 Careers", fecha: "Febrero 2026" },
            { nombre: "Cursor con Python: Desarrollo con IA", institucion: "Santander Open Academy", fecha: "Septiembre 2025" },
            { nombre: "Frontend Asistido con IA", institucion: "DEV.F", fecha: "Diciembre 2024" },
            { nombre: "Diplomado en Seguros", institucion: "BUAP", fecha: "Marzo 2024" },
        ],
        redes: [
            { red: "LinkedIn", link: "https://www.linkedin.com/in/arturomirandaez/", img: "/redes/linkedin.svg" },
            { red: "GitHub", link: "https://github.com/BeckyBooEz", img: "/redes/github.svg" },
            { red: "Instagram", link: "https://www.instagram.com/Arturo.Miranda.Ez/", img: "/redes/instagram.svg" },
            { red: "Facebook", link: "https://www.facebook.com/Arturo.Miranda.Ez", img: "/redes/facebook.svg" },
            { red: "Whatsapp", link: "https://api.whatsapp.com/send?phone=522322208635", img: "/redes/whatsapp.svg" },
            { red: "Gmail", link: "mailto:arturo.miranda.dev@gmail.com", img: "/redes/gmail.svg" },
            { red: "Tiktok", link: "https://www.tiktok.com/@arturo.miranda.ez", img: "/redes/tiktok.svg" },
            { red: "Spotify", link: "https://open.spotify.com/user/22rllkn5pqe35vp65sjzpsp5i?si=fab80fd3bd2e401e", img: "/redes/spotify.svg" },
            { red: "Steam", link: "https://steamcommunity.com/profiles/76561198334664881/", img: "/redes/steam.svg" },
            { red: "Dicord", link: "https://discord.gg/sXpuyXdbvg", img:"/redes/discord.svg"}
        ],
    },
]
