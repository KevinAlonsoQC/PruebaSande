import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { perfilGuard } from './core/guards/perfil.guard';
import { NoAuth } from './core/guards/no-auth.guard';

import { LoginComponent } from './features/auth/login/login.component';
import { ContactosListComponent } from './features/contactos/contactos-list/contactos-list.component';
import { ContactoFormComponent } from './features/contactos/contacto-form/contacto-form.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },

    //rutas publicas
    { path: 'login', canActivate:[NoAuth] ,component: LoginComponent },

    //rutas protegidas
    { path: 'contactos', canActivate: [authGuard], component: ContactosListComponent },
    {
        path: 'contactos/nuevo',
        canActivate: [authGuard, perfilGuard],
        data: { allowedProfiles: ['1', '2'] },
        component: ContactoFormComponent
    },
    {
        path: 'contactos/:id/editar',
        canActivate: [authGuard, perfilGuard],
        data: { allowedProfiles: ['1', '2'] },
        component: ContactoFormComponent
    },

    { path: '**', redirectTo: 'login' }
];
