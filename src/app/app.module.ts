import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcelimportComponent } from './excelimport/excelimport.component';
import { ExcelexportComponent } from './excelimport/excelexport.component';
import { WelcomeComponent } from './excelimport/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ExcelimportComponent,
    ExcelexportComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path:'import', component: ExcelimportComponent },
      { path: 'export', component: ExcelexportComponent },
      { path:'welcome', component: WelcomeComponent },
      { path:'', redirectTo: 'welcome', pathMatch: 'full'} ,
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
