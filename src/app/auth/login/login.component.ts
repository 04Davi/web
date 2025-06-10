import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  recentServers: string[] = ['DESKTOP-7B84GBT', 'SQL1001.site4now.net', 'MYSQL1001.site4now.net'];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      server: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { server } = this.loginForm.value;
      if (!this.recentServers.includes(server)) {
        this.recentServers.unshift(server);
        if (this.recentServers.length > 5) this.recentServers.pop();
      }
      this.http.post<any>('http://localhost:3000/api/login', { server })
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            if (response.success) {
              localStorage.setItem('auth_token', response.token);
              localStorage.setItem('last_server', server);
              this.router.navigate(['/databases']);
            } else {
              this.errorMessage = response.message || 'Error de autenticación';
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'Error al conectar con el servidor';
            console.error('Error detallado:', err);
          }
        });
    }
  }

  onServerChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.loginForm.get('server')?.setValue(selectElement.value);
  }
}