import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ) { }

  /**
   * Metodo que se ejecuta cuando se presiona el botón de buscar por capital
   * @param term el término de búsqueda
   */
  searchByCapital( term: string): void {

    this.isLoading = true;

    this.countriesService.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
