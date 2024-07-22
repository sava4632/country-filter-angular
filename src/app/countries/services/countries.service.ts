import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private baseUrl = 'https://restcountries.com/v3.1';

  constructor( private httpClient: HttpClient ) { }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.httpClient.get<Country[]>( url )
    .pipe(
      catchError( () => of([])),
      // delay( 2000 ), // delay: permite poner un delay antes de retornar los datos
    );
  }

  searchCountryByAlphaCode ( code: string ): Observable<Country | null> {

    const url = `${ this.baseUrl }/alpha/${ code }`;

    return this.httpClient.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( catchError => of(null) )
      )
  }

  /**
   * Hace una petición a la API para obtener la lista de países por un término de búsqueda
   * @param term el término de búsqueda
   * @returns una lista de países que coinciden con el término de búsqueda. Es un observable que emite un array de objetos de tipo Country.
   *
   * [Observable]: Es un objeto en el cual a lo largo del tiempo, puede estar emitiendo diferentes valores.
   * Usualmente cuando hablamos de “suscribimos a los observables”, significa estar escuchando las emisiones
   * que ese objeto estará emitiendo a lo largo de su vida.
   */
  searchCapital(term: string): Observable<Country[]> {
    const url = `${ this.baseUrl }/capital/${ term }`;
    return this.getCountriesRequest( url );
  }

  /**
   * Busca un país por su nombre
   * @param term el término de búsqueda
   * @returns una lista de países que coinciden con el término de búsqueda. Es un observable que emite un array de objetos de tipo Country.
   * En caso de error, emite un array vacío.
   */
  searchCountry( term: string ): Observable<Country[]>{
    const url = `${ this.baseUrl }/name/${ term }`;
    return this.httpClient.get<Country[]>( url )
      .pipe(
        catchError( () => of([]))
      );
  }

  /**
   * Busca un país por su región
   * @param term el término de búsqueda
   * @returns una lista de países que coinciden con el término de búsqueda. Es un observable que emite un array de objetos de tipo Country.
   * En caso de error, emite un array vacío.
   */
  searchRegion( term: string ): Observable<Country[]>{
    const url = `${ this.baseUrl }/region/${ term }`;
    return this.httpClient.get<Country[]>( url )
      .pipe(
        catchError( () => of([]))
      );
  }
}
