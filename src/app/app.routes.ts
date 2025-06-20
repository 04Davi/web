import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { CreateTableComponent } from './features/table-management/create-table.component';
import { DatabasesComponent } from './databases/databases.component';
//import { CreateTableComponent } from './table/create-table/create-table.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'databases', component: DatabasesComponent },
  { path: 'main', component: MainComponent },
  { path: 'table/create', component: CreateTableComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];