export interface ContactoListItem {
    idContacto: string;
    rutContacto: string;
    nombreContacto: string;
}

export interface ContactoDetalle {
    idUsuario: string;
    idContacto: string;
    rutContacto: string;
    nombreContacto: string;
    abreviacion: string;
    telefono: string;
    email: string;
}

export interface ContactoCrearBody {
    idUsuario: string;
    idContacto: '0';
    rutContacto: string;
    nombreContacto: string;
    abreviacion: string;
    telefono: string;
    email: string;
}

export interface ContactoUpdateBody {
    idUsuario: string;
    idContacto: string;
    nombreContacto: string;
    abreviacion: string;
    telefono: string;
    email: string;
}

export interface ContactoDeleteBody {
    idUsuario: string;
    idContacto: string;
}
