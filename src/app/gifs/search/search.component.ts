import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  //! para decir que el objeto nunca sera nulo
  @ViewChild('textSearch') textSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifsService) {}

  search() {
    //console.log(this.textSearch.nativeElement.value);
    const value = this.textSearch.nativeElement.value;

    if (value.trim().length == 0) {
      return;
    }

    this.gifService.searchGifs(value);

    this.textSearch.nativeElement.value = '';
  }
}
