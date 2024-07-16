import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ) {}

  /**
   * Envia el termino de busqueda al servicio y obtiene la lista de paises encontrados
   * @param term el parametro de busqueda
   */
  searchByRegion( term:string ): void {
    this.countriesService.searchRegion( term )
      .subscribe( countries => {
        this.countries = countries
      })
  }
}
