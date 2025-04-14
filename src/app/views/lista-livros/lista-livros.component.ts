import { Subscription } from 'rxjs';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Livro, LivrosResultado } from 'src/app/module/interfaces';

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
  livrosResultadoParaLivros(items): Livro[] {
    const livros: Livro[] = [];
    items.forEach(item => {
      livros.push(this.livro = {
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail
      })
    })
    return livros;
  }

  ngOnDestroy() {
    this.subcription.unsubscribe()
  }
}



