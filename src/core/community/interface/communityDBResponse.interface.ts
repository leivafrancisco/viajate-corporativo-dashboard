export interface CommunityDBResponse {
  data:    Data;
  message: string;
  status:  boolean;
}

interface Data {
  comunidades: Community[];
  meta:        Meta;
}

interface Community {
  id:            number;
  nombre:        string;
  descripcion:   string;
  codigo_acceso: string;
  habilitada:    boolean;
  foto_perfil:   string;
}

interface Meta {
  page: Page;
}

interface Page {
  currentPage: number;
  from:        number;
  lastPage:    number;
  perPage:     number;
  to:          number;
  total:       number;
}



