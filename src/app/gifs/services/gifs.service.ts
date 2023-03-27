import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _history: string[] = [];
  private apiKey: string = 'BgOTeUN6Xf6Iwg9RGCJVUDbZ3ow3xtJ1';
  public results: Gif[] = [];

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('gifs')!) || [];
  }

  public get gethistory(): string[] {
    return [...this._history];
  }

  searchGifs(arg: string) {
    arg = arg.toLocaleLowerCase();
    if (!this._history.includes(arg)) {
      this._history.unshift(arg);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._history));
    }

    this.http
      .get<SearchGIFResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${arg}&limit=10`
      )
      .subscribe((res) => {
        console.log(res);
        this.results = res.data;
        localStorage.setItem('gifs', JSON.stringify(this.results));
      });
  }
}

//api.giphy.com/v1/gifs/search?api_key=BgOTeUN6Xf6Iwg9RGCJVUDbZ3ow3xtJ1
