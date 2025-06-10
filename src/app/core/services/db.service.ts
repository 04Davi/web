import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table, Field } from '../models/table.model';
import { Relationship } from '../models/relationship.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getMetadata(dbType: 'mssql' | 'mysql'): Observable<any> {
    return this.http.get(`${this.apiUrl}/metadata/${dbType}`);
  }

  createTable(table: Table): Observable<any> {
    return this.http.post(`${this.apiUrl}/tables`, table);
  }

  createRelationship(relationship: Relationship): Observable<any> {
    return this.http.post(`${this.apiUrl}/relationships`, relationship);
  }

  executeQuery(query: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/query`, { query });
  }
}