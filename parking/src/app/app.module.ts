import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToasterModule } from 'angular2-toaster';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';

import { ParkingService } from './services/parking.service';

const appRoutes : Routes = [
  {path : '', component: HomeComponent },
  {path : 'home', component: HomeComponent },
  {path : 'add', component: AddComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ToasterModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ParkingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
