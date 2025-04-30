export interface CommunityDBResponse {
    data:    Data;
    message: string;
    status:  boolean;
}

export interface Data {
    comunidades: Comunidad[];
    meta:        Meta;
}

export interface Comunidad {
    id:             number;
    nombre:         string;
    descripcion:    string;
    codigo_acceso:  string;
    habilitada:     boolean;
    foto_perfil:    string;
    localidad:      string;
    provincia:      string;
    pais:           string;
    tipo_comunidad: string;
    email:          string;
    telefono:       string;
    cuit:           string;
    web_url:        string;
    calle:          string;
    altura:         number;
    numero_piso:    number;
    lat:            number;
    lng:            number;
}

export interface Meta {
    page: Page;
}

export interface Page {
    currentPage: number;
    from:        number;
    lastPage:    number;
    perPage:     number;
    to:          number;
    total:       number;
}
