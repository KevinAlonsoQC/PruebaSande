import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';

export const authGuard: CanActivateFn = () => {
    const utils = inject(UtilsService);
    const router = inject(Router);

    const token = utils.getFromLocalStorage('auth_token');
    if (token) return true;

    return router.parseUrl('/login');
};
