export interface Community {
  id:            number;
  nombre:        string;
  descripcion:   string;
  codigo_acceso: string;
  habilitada:    boolean;
  foto_perfil:   string;
}

export interface TipoComunidad {
  id: number;
  tipo: string;
  activo: boolean;
}

export interface TipoComunidadResponse {
  data: {
    TipoComunidades: TipoComunidad[];
    Meta: {
      page: {
        currentPage: number;
        from: number;
        lastPage: number;
        perPage: number;
        to: number;
        total: number;
      };
    };
  };
  message: string;
  status: boolean;
}

export interface CreateCommunityRequest {
  nombre: string;
  descripcion: string;
  localidad_id: number;
  tipo_comunidad_id: number;
  email: string;
  telefono: string;
  cuit: string;
  web_url: string;
  street_address: string;
  numero_piso?: number;
}

export interface CreateCommunityResponse {
  data: {
    comunidad: {
      id: number;
      nombre: string;
      descripcion: string;
      localidad_id: number;
      tipo_comunidad_id: number;
      email: string;
      telefono: string;
      cuit: string;
      web_url: string;
      street_address: string;
      numero_piso?: number;
      activo: boolean;
    };
  };
  message: string;
  status: boolean;
}