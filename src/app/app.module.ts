import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DailyTasksComponent } from './daily-tasks/daily-tasks.component';
import { LoginComponent } from './account/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor.interceptor';
import {MatTableModule} from '@angular/material/table';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
 declarations: [
  AppComponent,
  DailyTasksComponent,
  LoginComponent
  ],

 imports: [
  BrowserModule,
  AppRoutingModule, // import the configured Router to the AppModule
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatTableModule,
  NgbDatepickerModule,
  MatFormFieldModule, 
  MatSelectModule, 
  MatInputModule,
  FormsModule,
  BrowserAnimationsModule
 ],

 providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
 bootstrap: [AppComponent]
})

export class AppModule { }