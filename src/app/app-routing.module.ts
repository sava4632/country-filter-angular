import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePageComponent } from "./shared/pages/home-page/home-page.component";
import { AboutPageComponent } from "./shared/pages/about-page/about-page.component";
import { ContactPageComponent } from "./shared/pages/contact-page/contact-page.component";

// Creamos una lista de rutas de nuestra aplicación
const routes: Routes = [
  // {
  //   path: "", // Aqui definimos la URL que se mostrará en el navegador
  //   component: HomePageComponent, // Aqui definimos el componente que se mostrará en la URL
  // },
  {
    path: "about",
    component: AboutPageComponent,
  },
  {
    path: "contact",
    component: ContactPageComponent,
  },
  {
    path: "countries",
    // Lazy loading: Cargamos el modulo de paises de forma dinámica
    loadChildren: () => import( './countries/countries.module' ).then( modulo => modulo.CountriesModule ) // El lazy loading sirve para cargar módulos de forma dinámica, es decir, solo se cargan cuando se necesitan
  },
  {
    path: "**", // Si la URL no coincide con ninguna de las rutas anteriores, redirigimos a la ruta "home"
    redirectTo: "countries",
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ), // Aqui cargamos las rutas de nuestra aplicación. Si no es el modulo principal, usamos RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule, // Exportamos el modulo de rutas para que pueda ser usado en otros módulos
  ],
})
export class AppRoutingModule {}
