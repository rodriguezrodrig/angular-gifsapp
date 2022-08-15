import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private apiKey: string = 'tIwDgOK311FCriaL7ZckcHcy3tu3Kz6s';  
  private servicioUrl ='https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados:Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this. resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];

  }

  buscarGifs( query: string = ''){

    query = query.toLocaleLowerCase();

    if( !this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    console.log(params.toString());

    //trabajamos con observables en lugar de promesas
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
    .subscribe( (resp ) => {
      this.resultados = resp.data;  
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
  
  }
}
