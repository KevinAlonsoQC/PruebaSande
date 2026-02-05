import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error = '';

  form = this.fb.group({
    usuario: ['', Validators.required],
    clave: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const body = this.form.getRawValue() as { usuario: string; clave: string };
    this.auth.login(body).subscribe({
      next: () => this.router.navigateByUrl('/contactos'),
      error: (e: Error) => {
        this.error = e.message || 'Login falló';
        this.loading = false;
      },
      complete: () => (this.loading = false)
    });
  }
}
