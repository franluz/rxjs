import { Subscription } from 'rxjs';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: [];
  campoBusca: string = '';
  subcription: Subscription;
  constructor(private livroService: LivroService) { }
  buscarLivros() {
    this.subcription = this.livroService.buscar(this.campoBusca).subscribe(
      {
        next: retornoAPI => console.log('ok'),
        error: erro => console.log(erro),
        complete: () => console.log('CONSEGUI')
      }
    );
  }
  ngOnDestroy(){
    this.subcription.unsubscribe()
  }
}



