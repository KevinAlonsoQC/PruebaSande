import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ContactosService } from '../../../core/services/contacto.service';
import { UtilsService } from '../../../core/services/utils.service';
import { AuthService } from '../../../core/services/auth.service';
import { ContactoListItem } from '../../../core/models/contacto.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactos-list.component.html',
  styleUrl: './contactos-list.component.scss'
})
export class ContactosListComponent {
  private contactosSvc = inject(ContactosService);
  private utils = inject(UtilsService);
  private router = inject(Router);
  private auth = inject(AuthService);

  contactos: ContactoListItem[] = [];
  loading = false;
  error = '';

  get perfil(): '1' | '2' | '3' | null {
    return this.utils.getFromLocalStorage('perfil');
  }

  get canCreate() {
    return this.perfil === '1' || this.perfil === '2';
  }

  get canEdit() {
    return this.perfil === '1' || this.perfil === '2';
  }

  get canDelete() {
    return this.perfil === '1';
  }

  ngOnInit() {
    const idUsuario = this.utils.getFromLocalStorage('idUsuario');
    if (!idUsuario) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.loading = true;
    this.contactosSvc.listarContactos(idUsuario).subscribe({
      next: (data) => (this.contactos = data ?? []),
      error: (e: Error) => (this.error = e.message),
      complete: () => (this.loading = false)
    });
  }

  goNuevo() {
    this.router.navigateByUrl('/contactos/nuevo');
  }

  goEditar(idContacto: string) {
    this.router.navigate(['/contactos', idContacto, 'editar']);
  }

  eliminar(idContacto: string) {
    if (!this.canDelete) return;

    const idUsuario = this.utils.getFromLocalStorage('idUsuario');
    if (!idUsuario) return;

    this.contactosSvc.deleteContacto({ idUsuario, idContacto }).subscribe({
      next: () => {
        this.contactos = this.contactos.filter(x => x.idContacto !== idContacto);
      },
      error: (e: Error) => (this.error = e.message)
    });
  }

  logout() {
    this.auth.logout();
  }
}
