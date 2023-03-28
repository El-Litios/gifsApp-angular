import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _history: string[] = [];
  private apiKey: string = 'BgOTeUN6Xf6Iwg9RGCJVUDbZ3ow3xtJ1';
  private apiUrl: string = 'https://api.giphy.com/v1/gifs';
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

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', arg);

    this.http
      .get<SearchGIFResponse>(
        `${this.apiUrl}/search`, {params}
      )
      .subscribe((res) => {
        console.log(res);
        this.results = res.data;
        localStorage.setItem('gifs', JSON.stringify(this.results));
      });
  }
}

//api.giphy.com/v1/gifs/search?api_key=BgOTeUN6Xf6Iwg9RGCJVUDbZ3ow3xtJ1
