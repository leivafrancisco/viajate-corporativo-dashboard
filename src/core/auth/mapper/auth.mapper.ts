import { MappedUser } from "../interface/auth.interface";
import { AuthDBResponse } from "../interface/authDBResponse.interface";

export const mapUserResponse = (response: AuthDBResponse): MappedUser => {
  const { usuario, token, refresh_token } = response.data;

  return {
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      email_verified: usuario.email_verified,
      apellido: usuario.apellido,
      numero: usuario.numero,
      genero: usuario.genero,
      fecha_nacimiento: new Date(usuario.fecha_nacimiento),
      calificacion_promedio: usuario.calificacion_promedio,
      foto_perfil: usuario.foto_perfil,
      activo: usuario.activo,
      total_conductor: usuario.total_conductor,
      total_pasajero: usuario.total_pasajero,
    },
    token,
    refreshToken: refresh_token,
  };
};
