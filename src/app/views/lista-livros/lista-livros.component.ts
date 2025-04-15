import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, switchMap, tap, throwError } from 'rxjs';
import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';
import { Item } from 'src/app/module/interfaces';
import { LivroVolumeInfo } from 'src/app/module/livroVolumeInfo';
import { FormControl } from '@angular/forms';
const PAUSA = 300
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {


  campoBusca = new FormControl();
  constructor(private livroService: LivroService) { }
  mensagemErro = '';
  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length >= 3),
      tap(() => console.log("antes do servidor")),
      distinctUntilChanged(),
      switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
      map(items => this.livrosResultadoParaLivros(items)),
      catchError(erro => {
        this.mensagemErro = 'Ops ocorreu um erro, recarregue a aplicacao'
        return EMPTY
        //throwError(() => new Error(this.mensagemErro = 'Ops ocorreu um erro, recarregue a aplicacao'))
      })
    )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    });
  }

}



