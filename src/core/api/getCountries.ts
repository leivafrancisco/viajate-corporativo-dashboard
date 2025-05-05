// src/api/getCountries.ts
import axios from "axios";

interface Localidad {
  id: number;
  nombre: string;
}

interface Provincia {
  nombre: string;
  localidades: Localidad[];
}

interface Pais {
  nombre: string;
  provincias: Provincia[];
}

interface PaisesResponse {
  data: {
    paises: Pais[];
  };
  message: string;
  status: boolean;
}

export const getPaises = async (): Promise<Pais[]> => {
  const { data } = await axios.get<PaisesResponse>("https://api-go-viajate-corporativo.onrender.com/api/v1/administracion/paises");
  return data.data.paises;
};
