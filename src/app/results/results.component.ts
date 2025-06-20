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
  results: {
    title: string;
    author: string;
    category: string;
    snippet: string;
    url: string;
  }[] = [];

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

    this.http.post<any>('http://127.0.0.1:5000/search', body).subscribe({
      next: (res) => {
        this.results = res.results.map((item: any) => ({
          title: item.title || 'Sem título',
          author: item.author || 'Autor desconhecido', // ou item.author se houver no futuro
          category: item.category || 'Sem categoria',
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
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query },
      queryParamsHandling: 'merge',
    });
  }
}
