import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>(); // creacion de un bouncer
  private debouncerSuscription?: Subscription;

  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter<string>();

  // emite el valor del input a las paginas que lo usen
  @Output()
  onValue: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = ''

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe (
      debounceTime( 300 ) // si el usuario deja de emitir valores por x segundos se ejecuta el suscribe.
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
      // console.log( 'debouncer value: ', value );
    })
  }

  ngOnDestroy(): void { // Metodo que se ejecuta cuando el componenete va a ser destruido
    this.debouncerSuscription?.unsubscribe() // se desuscribe de la suscripcion del debouncer luego de que el componente sea destruido.
  }

   emitValue( value: string ): void {
    this.onValue.emit(value);
   }

   onKeyPress( searchTerm: string ): void {
    this.debouncer.next( searchTerm );
   }
}
