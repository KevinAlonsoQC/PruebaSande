export interface Session {
    token: string;
    idUsuario: string;
    perfil: '1' | '2' | '3';
    nombre?: string;
    apellido?: string;
}

export interface LoginRequest {
    usuario: string;
    clave: string;
}

export interface LoginResponseItem {
    idUsuario: string;
    nombre: string;
    apellido: string;
    perfil: '1' | '2' | '3';
}
