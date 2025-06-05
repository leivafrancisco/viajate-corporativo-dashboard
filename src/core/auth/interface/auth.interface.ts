export interface Comunidad {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  email_verified: boolean;
  apellido: string;
  numero: string;
  genero: string;
  fecha_nacimiento: Date;
  calificacion_promedio: number;
  foto_perfil: string;
  activo: boolean;
  total_conductor: number;
  total_pasajero: number;
  comunidades: Comunidad[];
}

export interface MappedUser {
  usuario: Usuario;
  token: string;
  refreshToken: string;
}