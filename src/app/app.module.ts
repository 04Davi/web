import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {}