import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  query = '';
  // results: { title: string; author: string; snippet: string }[] = [];
  results: { title: string; author: string; snippet: string; url: string }[] =
    [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      //descomentar quando for usar o backend
      this.query = params['q'] || '';
      if (this.query.trim()) {
        this.fetchResults(this.query);
      }
    });

    // this.route.queryParams.subscribe((params) => {
    //   //apagar quando for usar o backend
    //   this.query = params['q'] || '';
    //   if (this.query.trim()) {
    //     if (this.useMockData) {
    //       this.results = this.mockResults(); // 👈 Usa dados mockados
    //     } else {
    //       this.fetchResults(this.query); // 👈 Usa dados do backend
    //     }
    //   }
    // });
  }

  // fetchResults(query: string) {
  //   const body = { query };

  //   this.http
  //     .post<any[]>('http://127.0.0.1:5000/search_logged', body)
  //     .subscribe({
  //       next: (res) => {
  //         this.results = res.map((item: any) => ({
  //           title: item.title || 'Sem título',
  //           author: item.authors?.join(', ') || 'Desconhecido',
  //           snippet: item.summary?.slice(0, 200) || 'Sem descrição',
  //         }));
  //       },
  //       error: (err) => {
  //         console.error('Erro na busca:', err);
  //       },
  //     });
  // }

  fetchResults(query: string) {
    const body = { query };

    this.http.post<any>('http://127.0.0.1:5000/search', body).subscribe({
      next: (res) => {
        this.results = res.results.map((item: any) => ({
          title: item.title || 'Sem título',
          author: item.category || 'Sem categoria',
          snippet: item.summary?.slice(0, 200) || 'Sem descrição',
          url: item.url || '#',
        }));
      },
      error: (err) => {
        console.error('Erro na busca:', err);
      },
    });
  }

  searchArticles(query: string) {
    // atualiza a URL com o novo parâmetro, o que aciona o ngOnInit novamente
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query },
      queryParamsHandling: 'merge',
    });
  }

  // useMockData = true; //apagar quando for usar o backend

  // mockResults() {
  //   //apagar quando for usar o backend
  //   return [
  //     {
  //       title: 'Artigo Exemplo A',
  //       author: 'João da Silva',
  //       snippet: 'Este é um resumo simulado do artigo A para testes.',
  //     },
  //     {
  //       title: 'Artigo Exemplo B',
  //       author: 'Maria Oliveira',
  //       snippet: 'Este é um resumo simulado do artigo B com mais conteúdo.',
  //     },
  //     {
  //       title: 'Artigo Exemplo C',
  //       author: 'Pedro Souza',
  //       snippet:
  //         'Mais um artigo fictício para validar a interface de resultados.',
  //     },
  //   ];
  // }
}
