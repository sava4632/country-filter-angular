import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit {

  private debouncer: Subject<string> = new Subject<string>(); // creacion de un bouncer

  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter<string>();

  // emite el valor del input a las paginas que lo usen
  @Output()
  onValue: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public placeholder: string = '';

  ngOnInit(): void {
    this.debouncer
    .pipe (
      debounceTime( 300 ) // si el usuario deja de emitir valores por x segundos se ejecuta el suscribe.
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
      // console.log( 'debouncer value: ', value );
    })
  }

   emitValue( value: string): void {
    this.onValue.emit(value);
   }

   onKeyPress( searchTerm: string ): void {
    this.debouncer.next( searchTerm );
   }
}
