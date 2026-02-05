import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    protected router = inject(Router);
    private dataSubjects: { [key: string]: BehaviorSubject<any> } = {};

    constructor() { }

    routerLink(url: string) {
        return this.router.navigateByUrl(url);
    }

    saveInLocalStorage(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
        if (this.dataSubjects[key]) {
            this.dataSubjects[key].next(value);
        }
    }

    getFromLocalStorage(key: string): any {
        try {
            const data = localStorage.getItem(key);
            if (!data) {
                return null;
            }
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error al recuperar ${key} desde LocalStorage:`, error);
            return null;
        }
    }

    deleteFromLocalStorage(key: string) {
        localStorage.removeItem(key);
        if (this.dataSubjects[key]) {
            this.dataSubjects[key].next(null);
        }
    }

    getDataObservable(key: string) {
        return this.dataSubjects[key]?.asObservable();
    }

    clearAllLocalStorage() {
        localStorage.clear();
        Object.keys(this.dataSubjects).forEach((k) => {
            this.dataSubjects[k].next(null);
        });
    }

    clearAll() {
        this.clearAllLocalStorage();
        return this.router.navigateByUrl('/login');
    }

}
