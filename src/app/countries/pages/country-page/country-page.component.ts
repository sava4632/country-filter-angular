import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';


@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute, // ActivatedRoute se usa para acceder a los parámetros de la ruta activa, como el ID de un país en este caso.
    private router: Router,
    private countriesService: CountriesService,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      // switchMap se utiliza para cambiar de un Observable a otro, cancelando el anterior si una nueva emisión ocurre antes de completarse.
      switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )),
    )
    .subscribe( ( country ) => { // obtenemos el id de los parametros de la solicitud
      if ( !country ) {
        return this.router.navigateByUrl(''); // si el pais no existe/(null) envia al usuario a la pagina de inicio
      }

      return this.country = country; // En el caso contrario asigna el country encontrado a la varible local
    })
  }
}
