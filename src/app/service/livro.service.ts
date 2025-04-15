import { Item } from './../module/interfaces';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { LivrosResultado } from '../module/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private httpClientModule: HttpClient) { }

  buscar(valorDigitado: string): Observable<Item[]> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.httpClientModule.get<LivrosResultado>(this.API, { params })
      .pipe(
         map(resultado => resultado.items),
      )

  }
}
