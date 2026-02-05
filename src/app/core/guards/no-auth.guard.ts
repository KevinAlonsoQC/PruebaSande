import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';

export const NoAuth: CanActivateFn = () => {
    const utils = inject(UtilsService);
    const router = inject(Router);
    const token = utils.getFromLocalStorage('auth_token');
    if (token) return router.parseUrl('/contactos');

    return true;
};
