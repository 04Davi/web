import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  serverName: string = localStorage.getItem('last_server') || '(No Definido)';
  databases: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadDatabases(); // Llama al método al inicializar el componente
  }

  loadDatabases() {
    this.isLoading = true;
    const server = localStorage.getItem('last_server');
    if (!server) {
      this.errorMessage = 'No se ha seleccionado un servidor.';
      this.isLoading = false;
      return;
    }

    this.http.get<any>(`http://localhost:3000/api/serveObjects/list?server=${encodeURIComponent(server)}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            const dbs = response.data.filter((d: { objectTypeId: number }) => d.objectTypeId === 1002);
            this.databases = dbs.map((db: { objectName: string; objectTypeId: number }) => ({
              ...db,
              expanded: false,
              objects: [],
              loadingObjects: false
            }));
            this.loadDatabaseObjects(); // Carga los objetos de las bases de datos
          } else {
            this.errorMessage = response.message || 'Error desconocido al cargar las bases de datos.';
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Error al cargar las bases de datos.';
          console.error('Error detallado:', err);
        }
      });
  }

  loadDatabaseObjects() {
    this.databases.forEach(db => {
      if (!db.objects.length && db.expanded) {
        db.loadingObjects = true;
        const server = localStorage.getItem('last_server') || '';
        this.http.get<any>(`http://localhost:3000/api/serveObjects/list?server=${encodeURIComponent(server)}&database=${db.objectName}`)
          .subscribe({
            next: (response) => {
              db.loadingObjects = false;
              if (response.success) {
                db.objects = response.data
                  .filter((obj: { objectTypeId: number }) => obj.objectTypeId === 1004) // Solo tablas por ahora
                  .map((obj: { objectName: string; objectTypeId: number }) => ({
                    name: obj.objectName,
                    icon: 'table icon'
                  }));
              }
            },
            error: (err) => {
              db.loadingObjects = false;
              console.error('Error al cargar objetos:', err);
            }
          });
      }
    });
  }

  toggleContent(db: any) {
    db.expanded = !db.expanded;
    if (db.expanded && !db.objects.length) {
      this.loadDatabaseObjects();
    }
  }

  createDatabase() {
    const dbName = prompt('Ingrese el nombre de la nueva base de datos:');
    if (dbName) {
      const server = localStorage.getItem('last_server');
      this.http.post<any>(`http://localhost:3000/api/createDatabase?server=${encodeURIComponent(server || '')}`, { dbName })
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.loadDatabases(); // Recarga las bases de datos
            } else {
              this.errorMessage = response.message;
            }
          },
          error: (err) => {
            this.errorMessage = 'Error al crear la base de datos.';
            console.error('Error detallado:', err);
          }
        });
    }
  }

  disconnect() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('last_server');
    this.router.navigate(['/login']);
  }
}