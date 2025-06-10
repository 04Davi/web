import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  template: `
    <div class="ui header dividing p-2 bg-teal-700 text-white">
      <i class="server icon"></i> Servidor: {{ serverName || '(No Definido)' }}
    </div>
    <div class="ui list p-2" id="frm-server-objects-menu">
      <div *ngFor="let db of databases">
        <div class="item" (click)="toggleContent(db)">
          <i [class]="db.expanded ? 'minus' : 'plus' + ' teal icon'"></i>
          <i class="database icon"></i>
          <div class="content">
            <div class="header">{{ db.objectName }}</div>
            <div class="list" *ngIf="db.expanded">
              <div *ngFor="let obj of db.objects" class="item">
                <i [class]="obj.icon"></i>
                <div class="content"><div class="description">{{ obj.name }}</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  serverName = 'Test Server';
  databases: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/api/serveObjects/list').subscribe(data => {
      const dbs = data.data.filter((d: { objectTypeId: number }) => d.objectTypeId === 1002);
      this.databases = dbs.map((db: { objectName: string; objectTypeId: number }) => ({ ...db, expanded: false, objects: [] }));
    });
  }

  toggleContent(db: any) {
    db.expanded = !db.expanded;
  }
}