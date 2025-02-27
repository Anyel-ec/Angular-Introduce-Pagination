import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { RouterModule, Routes } from '@angular/router';

// Definición de rutas
const routes: Routes = [
  { path: '', component: DataTableComponent }, // Ruta para mostrar la tabla
  { path: '**', redirectTo: '' } // Redirecciona rutas no encontradas
];

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Agregar HttpClientModule aquí
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
