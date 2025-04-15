import { Subscription } from 'rxjs';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Item, Livro, LivrosResultado } from 'src/app/module/interfaces';
import { LivroVolumeInfo } from 'src/app/module/livroVolumeInfo';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Livro[];
  campoBusca: string = '';
  subcription: Subscription;
  livro: Livro;
  constructor(private livroService: LivroService) { }
  buscarLivros() {
    this.subcription = this.livroService.buscar(this.campoBusca).subscribe(
      {
        next: (items) => { this.listaLivros = this.livrosResultadoParaLivros(items) },
        error: erro => console.log(erro),
      }
    );
  }
  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe()
  }
}



