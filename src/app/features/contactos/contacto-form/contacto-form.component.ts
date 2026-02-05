import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContactosService } from '../../../core/services/contacto.service';
import { UtilsService } from '../../../core/services/utils.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto-form.component.html',
  styleUrl: './contacto-form.component.scss'
})
export class ContactoFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contactosSvc = inject(ContactosService);
  private utils = inject(UtilsService);

  loading = false;
  error = '';
  idContacto: string | null = null;

  form = this.fb.group({
    rutContacto: ['', Validators.required],
    nombreContacto: ['', Validators.required],
    abreviacion: [''],
    telefono: [''],
    email: [''],
  });

  get isEdit() {
    return !!this.idContacto;
  }

  ngOnInit() {
    this.idContacto = this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.loadDetalle(this.idContacto!);
    }
  }

  loadDetalle(idContacto: string) {
    const idUsuario = this.utils.getFromLocalStorage('idUsuario');
    if (!idUsuario) return;

    this.loading = true;
    this.contactosSvc.obtenerContacto(idUsuario, idContacto).subscribe({
      next: (arr) => {
        const c = arr?.[0];
        if (!c) throw new Error('Contacto no encontrado');

        this.form.patchValue({
          rutContacto: c.rutContacto,
          nombreContacto: c.nombreContacto,
          abreviacion: c.abreviacion,
          telefono: c.telefono,
          email: c.email
        });
      },
      error: (e: Error) => (this.error = e.message),
      complete: () => (this.loading = false)
    });
  }

  save() {
    if (this.form.invalid) return;

    const idUsuario = this.utils.getFromLocalStorage('idUsuario');
    if (!idUsuario) return;

    this.loading = true;
    this.error = '';

    const v = this.form.getRawValue();

    if (!this.isEdit) {
      this.contactosSvc.crearContacto({
        idUsuario,
        idContacto: '0',
        rutContacto: v.rutContacto!,
        nombreContacto: v.nombreContacto!,
        abreviacion: v.abreviacion ?? '',
        telefono: v.telefono ?? '',
        email: v.email ?? ''
      }).subscribe({
        next: () => this.router.navigateByUrl('/contactos'),
        error: (e: Error) => (this.error = e.message),
        complete: () => (this.loading = false)
      });
    } else {
      this.contactosSvc.updateContacto({
        idUsuario,
        idContacto: this.idContacto!,
        nombreContacto: v.nombreContacto!,
        abreviacion: v.abreviacion ?? '',
        telefono: v.telefono ?? '',
        email: v.email ?? ''
      }).subscribe({
        next: () => this.router.navigateByUrl('/contactos'),
        error: (e: Error) => (this.error = e.message),
        complete: () => (this.loading = false)
      });
    }
  }

  back() {
    this.router.navigateByUrl('/contactos');
  }
}
