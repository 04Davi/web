import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relationship-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './relationship-management.component.html',
  styleUrls: ['./relationship-management.component.css']
})
export class RelationshipManagementComponent {
  relationshipForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.relationshipForm = this.fb.group({
      sourceTable: ['', Validators.required],
      sourceField: ['', Validators.required],
      targetTable: ['', Validators.required],
      targetField: ['', Validators.required],
      type: ['one-to-many', Validators.required]
    });
  }

  onSubmit() {
    const relationship = this.relationshipForm.value;
    this.http.post<any>('http://localhost:3000/api/relationships', relationship).subscribe({
      next: () => alert('Relación creada exitosamente!'),
      error: (err) => alert('Error al crear la relación: ' + err.message)
    });
  }
}