import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-databases',
  standalone: true,
  imports: [],
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.css']
})
export class DatabasesComponent implements OnInit {
  databases: { objectId: string; schema: string; objectName: string; objectTypeId: number }[] = [];
  errorMessage: string = '';
  server: string = localStorage.getItem('last_server') || '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if (!this.server) {
      this.errorMessage = 'No se ha seleccionado un servidor.';
      return;
    }
    // Cargar datos desde localStorage
    const serverData = localStorage.getItem('server_data');
    if (serverData) {
      this.databases = JSON.parse(serverData);
    } else {
      this.loadDatabases();
    }
  }

  loadDatabases() {
    this.http.get<any>(`http://localhost:3000/api/serveObjects/list?server=${encodeURIComponent(this.server)}`)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.databases = response.data;
            localStorage.setItem('server_data', JSON.stringify(response.data)); // Guardar para futuras referencias
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar las bases de datos';
          console.error('Error detallado:', err);
        }
      });
  }

  disconnect() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('last_server');
    localStorage.removeItem('server_data');
    this.router.navigate(['/login']);
  }
}