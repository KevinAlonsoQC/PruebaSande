import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { UtilsService } from './utils.service';

export abstract class ApiService {
    protected http = inject(HttpClient);
    protected baseUrl = environment.apiBase;
    protected utilsSvc = inject(UtilsService);

    protected getAuthHeaders(): HttpHeaders {
        const token = this.utilsSvc.getFromLocalStorage('auth_token');
        if (!token) {
            this.utilsSvc.clearAll();
            throw new Error('Token no encontrado en el almacenamiento local.');
        }
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        });
    }

    protected getPublicHeaders(): HttpHeaders {
        return new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    protected handleError(error: HttpErrorResponse): Observable<never> {
        console.error('Error en la API:', error);
        if (error.status === 401 || error.status === 403) {
            this.utilsSvc.clearAll();
        }
        return throwError(() => new Error(error.error?.message || 'Ocurrió un error inesperado.'));
    }

    protected requestAuth<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        endpoint: string,
        body: any = null
    ): Observable<T> {
        const headers = this.getAuthHeaders();
        const url = `${this.baseUrl}/${endpoint}`;
        return this.request<T>(method, url, headers, body);
    }

    protected requestPublic<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        endpoint: string,
        body: any = null
    ): Observable<T> {
        const headers = this.getPublicHeaders();
        const url = `${this.baseUrl}/${endpoint}`;
        return this.request<T>(method, url, headers, body);
    }

    private request<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        headers: HttpHeaders,
        body: any
    ): Observable<T> {
        switch (method) {
            case 'GET':
                return this.http.get<T>(url, { headers }).pipe(catchError(this.handleError.bind(this)));
            case 'POST':
                return this.http.post<T>(url, body, { headers }).pipe(catchError(this.handleError.bind(this)));
            case 'PUT':
                return this.http.put<T>(url, body, { headers }).pipe(catchError(this.handleError.bind(this)));
            case 'DELETE':
                return this.http.delete<T>(url, { headers }).pipe(catchError(this.handleError.bind(this)));
            default:
                throw new Error(`Método HTTP ${method} no soportado`);
        }
    }
}
