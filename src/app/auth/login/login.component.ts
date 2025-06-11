import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  recentServers: string[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      server: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { server } = this.loginForm.value;

      // Actualizar lista de servidores recientes
      if (!this.recentServers.includes(server)) {
        this.recentServers.unshift(server);
        if (this.recentServers.length > 5) this.recentServers.pop();
      }

      // Realizar la solicitud HTTP al servidor
      this.http.post<any>('http://localhost:3000/api/login', { server })
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            console.log('Respuesta completa del servidor:', response); // Depuración detallada
            if (response.success) {
              // Guardar token y datos del servidor en localStorage
              localStorage.setItem('auth_token', response.token);
              localStorage.setItem('last_server', server);
              localStorage.setItem('server_data', JSON.stringify(response.data));
              // Navegar a la página de bases de datos
              this.router.navigate(['/databases']);
            } else {
              this.errorMessage = response.message || 'Error de autenticación';
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'Error al conectar con el servidor';
            console.log('Error detallado:', err); // Depuración del error
            if (err.status === 500) {
              console.log('Error 500 - Revisa el backend:', err.error);
            }
          }
        });
    }
  }

  onServerChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.loginForm.get('server')?.setValue(selectElement.value);
  }
}
///