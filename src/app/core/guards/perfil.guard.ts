import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';

export const perfilGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const utils = inject(UtilsService);
    const router = inject(Router);
    const perfil = utils.getFromLocalStorage('perfil'); 
    const allowed: string[] = route.data['allowedProfiles'] ?? [];

    if (perfil && allowed.includes(perfil)) return true;

    return router.parseUrl('/contactos');
};
