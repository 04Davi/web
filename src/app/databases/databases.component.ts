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
  databases: string[] = [];
  errorMessage: string = '';
  server: string = localStorage.getItem('last_server') || '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if (!this.server) {
      this.errorMessage = 'No se ha seleccionado un servidor.';
      return;
    }
    this.loadDatabases();
  }

  loadDatabases() {
    this.http.get<any>(`http://localhost:3000/api/serveObjects/list?server=${encodeURIComponent(this.server)}`)
      .subscribe({
        next: (response) => {
          if (response.success) {
            // Filtramos para mostrar solo bases de datos (type 'D')
            this.databases = response.data.filter((item: any) => item.objectTypeId === 1002).map((item: any) => item.objectName);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar las bases de datos';
        }
      });
  }

  disconnect() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('last_server');
    this.router.navigate(['/login']);
  }
}