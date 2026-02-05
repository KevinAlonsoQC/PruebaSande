import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponseItem } from '../models/session.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {
    login(body: LoginRequest) {
        return this.requestPublic<LoginResponseItem[]>('POST', 'Login', body).pipe(
            map((arr) => {
                const user = arr?.[0];
                if (!user) throw new Error('Login inválido: respuesta vacía');

                const token = (globalThis.crypto?.randomUUID?.() ?? `local-${Date.now()}-${Math.random().toString(16).slice(2)}`);
                this.utilsSvc.saveInLocalStorage('auth_token', token);
                this.utilsSvc.saveInLocalStorage('idUsuario', user.idUsuario);
                this.utilsSvc.saveInLocalStorage('perfil', user.perfil);
                this.utilsSvc.saveInLocalStorage('user_nombre', user.nombre);
                this.utilsSvc.saveInLocalStorage('user_apellido', user.apellido);

                return user;
            })
        );
    }

    logout() {
        this.utilsSvc.clearAll();
        this.utilsSvc.routerLink('/login');
    }

    getPerfil(): '1' | '2' | '3' | null {
        return this.utilsSvc.getFromLocalStorage('perfil');
    }

    getIdUsuario(): string | null {
        return this.utilsSvc.getFromLocalStorage('idUsuario');
    }

    isLoggedIn(): boolean {
        return !!this.utilsSvc.getFromLocalStorage('auth_token');
    }
}
