import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-table',
  standalone: true,
  imports: [ReactiveFormsModule], // Asegúrate de que ReactiveFormsModule esté aquí
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {
  tableForm!: FormGroup;
  dataTypes: { dataTypeId: string; dataTypeName: string }[] = [];
  tables: { objectId: string; schema: string; objectName: string }[] = [];
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.tableForm = this.fb.group({
      schema: [{ value: 'No Definido', disabled: true }],
      tableName: ['', Validators.required],
      columns: this.fb.array([])
    });

    this.loadDataTypes();
    this.loadTables();
    this.addRow(); // Inicializa con una fila por defecto
  }

  get columns(): FormArray {
    return this.tableForm.get('columns') as FormArray;
  }

  addRow() {
    const columnGroup = this.fb.group({
      pk: [false],
      uq: [false],
      name: ['', Validators.required],
      dataType: ['', Validators.required],
      isNullable: [true], // Cambié a true para que sea consistente con el comportamiento inicial
      isAutoIncrement: [false],
      seed: [''],
      fkTable: [''],
      fkColumn: ['']
    });
    this.columns.push(columnGroup);
  }

  loadDataTypes() {
    this.http.get<{ data: { dataTypeId: string; dataTypeName: string }[] }>('http://localhost:3000/api/serveObjects/dataTypes').subscribe({
      next: (data) => {
        this.dataTypes = data.data;
      },
      error: (err) => {
        console.error('Error loading data types:', err);
        this.errorMessage = 'Error al cargar los tipos de datos.';
      }
    });
  }

  loadTables() {
    this.http.get<{ data: { objectId: string; schema: string; objectName: string }[] }>('http://localhost:3000/api/serveObjects/list').subscribe({
      next: (data) => {
        this.tables = data.data.filter((t) => t.schema !== null && t.objectName !== null);
      },
      error: (err) => {
        console.error('Error loading tables:', err);
        this.errorMessage = 'Error al cargar las tablas.';
      }
    });
  }

  createTable() {
    if (this.tableForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
      return;
    }

    const model = this.tableForm.getRawValue();
    this.http.post<any>('http://localhost:3000/api/table/create', model).subscribe({
      next: (response) => {
        console.log('Table created successfully:', response);
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Error creating table:', err);
        this.errorMessage = 'Error al crear la tabla.';
      }
    });
  }
}