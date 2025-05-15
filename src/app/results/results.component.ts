// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-results',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './results.component.html',
//   styleUrls: ['./results.component.css'],
// })
// export class ResultsComponent implements OnInit {
//   query = '';
//   results: { title: string; author: string; snippet: string }[] = [];

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit() {
//     this.route.queryParams.subscribe((params) => {
//       this.query = params['q'] || '';
//       this.results = this.mockResults();
//     });
//   }

//   mockResults() {
//     return [
//       {
//         title: 'Nome do artigo 1',
//         author: 'Autor 1',
//         snippet: 'Descrição breve 1',
//       },
//       {
//         title: 'Nome do artigo 2',
//         author: 'Autor 2',
//         snippet: 'Descrição breve 2',
//       },
//       {
//         title: 'Nome do artigo 3',
//         author: 'Autor 3',
//         snippet: 'Descrição breve 3',
//       },
//     ];
//   }
// }

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
  results: { title: string; author: string; snippet: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || '';
      if (this.query.trim()) {
        this.fetchResults(this.query);
      }
    });
  }

  fetchResults(query: string) {
    const body = { query };

    this.http.post<any[]>('http://127.0.0.1:5000/search', body).subscribe({
      next: (res) => {
        this.results = res.map((item: any) => ({
          title: item.title || 'Sem título',
          author: item.authors?.join(', ') || 'Desconhecido',
          snippet: item.summary?.slice(0, 200) || 'Sem descrição',
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
}
