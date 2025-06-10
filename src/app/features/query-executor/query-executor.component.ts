import { Component } from '@angular/core';
import { DbService } from '../../core/services/db.service';

@Component({
  selector: 'app-query-executor',
  templateUrl: './query-executor.component.html',
  styleUrls: ['./query-executor.component.css']
})
export class QueryExecutorComponent {
  query: string = '';
  result: any;

  constructor(private dbService: DbService) {}

  executeQuery() {
    if (this.query.trim()) {
      this.dbService.executeQuery(this.query).subscribe({
        next: (data) => this.result = data,
        error: (err) => alert('Error executing query: ' + err.message)
      });
    }
  }
}