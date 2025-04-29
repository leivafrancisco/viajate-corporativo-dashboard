export interface AuthDBResponse{
    data:    Data;
    message: string;
    status:  boolean;
}

interface Data {
    usuario:       Usuario;
    token:         string;
    refresh_token: string;
}

interface Usuario {
    id:                    number;
    nombre:                string;
    email:                 string;
    email_verified:        boolean;
    apellido:              string;
    numero:                string;
    genero:                string;
    fecha_nacimiento:      Date;
    calificacion_promedio: number;
    foto_perfil:           string;
    activo:                boolean;
    total_conductor:       number;
    total_pasajero:        number;
}
