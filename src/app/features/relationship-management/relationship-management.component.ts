import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../../core/services/db.service';
import { Relationship } from '../../core/models/relationship.model';

@Component({
  selector: 'app-relationship-management',
  templateUrl: './relationship-management.component.html',
  styleUrls: ['./relationship-management.component.css']
})
export class RelationshipManagementComponent {
  relationshipForm: FormGroup;

  constructor(private fb: FormBuilder, private dbService: DbService) {
    this.relationshipForm = this.fb.group({
      sourceTable: ['', Validators.required],
      sourceField: ['', Validators.required],
      targetTable: ['', Validators.required],
      targetField: ['', Validators.required],
      type: ['one-to-many', Validators.required]
    });
  }

  onSubmit() {
    const relationship: Relationship = this.relationshipForm.value;
    this.dbService.createRelationship(relationship).subscribe({
      next: () => alert('Relationship created successfully!'),
      error: (err) => alert('Error creating relationship: ' + err.message)
    });
  }
}