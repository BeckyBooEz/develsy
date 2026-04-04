export interface Curriculum {
    id: string
    perfil: Perfil
    educacion: Educacion[]
    experiencias: Experiencias[]
    habilidades: Habilidades
    cursos: Cursos[]
    redes: Red[]
}

interface Perfil {
    nombre: string
    profesion: string
    correo: string
    telefono: string
    ubicacion: string
    resumen: string
}

interface Educacion {
    escuela: string
    nivel: string
    titulo: string
    fechas: string
}

interface Cursos {
    nombre: string
    institucion: string
    fecha: string
}

interface Experiencias {
    entidad: string
    puesto: string
    fechas: string
    funciones: string[]
}

interface Habilidades {
    idiomas: Idiomas[]
    blandas: string[]
    duras: Duras[]
}

interface Idiomas {
    lengua: string
    nivel: string
}

interface Duras {
    habilidad: string
    nivel: string
}

interface Red {
    red: string
    link: string
    img: string
}