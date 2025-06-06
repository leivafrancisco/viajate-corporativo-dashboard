import { MappedUser } from "../interface/auth.interface";
import { AuthDBResponse } from "../interface/AuthDBResponse.interface";
import { jwtDecode } from "jwt-decode";

export const mapUserResponse = (response: AuthDBResponse): MappedUser => {
  const { token, refresh_token } = response.data;
  
  // Decodificar el token JWT para obtener la información del usuario
  const decodedToken: any = jwtDecode(token);
  const usuario = decodedToken.user;

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
      comunidades: usuario.comunidades,
      rol: decodedToken.rol,
    },
    token,
    refreshToken: refresh_token,
  };
};
