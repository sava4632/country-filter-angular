import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

const routes: Routes = [
  {
    path: 'by-capital',
    component: ByCapitalPageComponent
  },
  {
    path: 'by-country',
    component: ByCountryPageComponent
  },
  {
    path: 'by-region',
    component: ByRegionPageComponent
  },
  {
    path: 'by/:id', // :id es un parametro que se puede enviar
    component: CountryPageComponent
  },
  {
    path: "**", // Si la URL no coincide con ninguna de las rutas anteriores, redirigimos a la ruta "home"
    redirectTo: "by-capital",
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes ) // Importamos el modulo de rutas y le pasamos las rutas que definimos arriba como hijas
  ],
  exports: [
    RouterModule // Exportamos el modulo de rutas para poder usarlo en otros modulos
  ],
})
export class CountriesRoutingModule { }
