import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  //! para decir que el objeto nunca sera nulo
  @ViewChild('textSearch') textSearch!: ElementRef<HTMLInputElement>;
  search() {
    console.log(this.textSearch.nativeElement.value);

    this.textSearch.nativeElement.value = '';
  }
}
