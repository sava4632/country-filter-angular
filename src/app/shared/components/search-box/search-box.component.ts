import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  // emite el valor del input a las paginas que lo usen
  @Output()
  onValue: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public placeholder: string = '';

   emitValue( value: string): void {
    this.onValue.emit(value);
   }
}
