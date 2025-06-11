import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-query-executor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './query-executor.component.html',
  styleUrls: ['./query-executor.component.css']
})
export class QueryExecutorComponent {
  query: string = '';
  result: any;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  executeQuery() {
    if (this.query.trim()) {
      this.http.post<any>('http://localhost:3000/api/query', { query: this.query })
        .subscribe({
          next: (data) => {
            this.result = data;
            this.errorMessage = '';
          },
          error: (err) => {
            this.errorMessage = 'Error ejecutando la consulta: ' + err.message;
            console.error('Error detallado:', err); // Depuración
          }
        });
    }
  }
}