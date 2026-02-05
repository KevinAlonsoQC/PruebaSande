import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const utils = inject(UtilsService);
    const token = utils.getFromLocalStorage('auth_token');

    if (!token) return next(req);
    if (req.headers.has('Authorization')) return next(req);

    const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next(authReq);
};
