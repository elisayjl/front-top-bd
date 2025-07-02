import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateRelativePipe } from '../shared/pipes/date-relative.pipe';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule, DateRelativePipe],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  query = '';
  dateRange = '';
  customStart = '';
  customEnd = '';
  category = '';
  author = '';

  showFilters = false;

  categories: { id: string; name: string }[] = [];

  allResults: {
    title: string;
    author: string;
    category: string;
    snippet: string;
    url: string;
    published: string;
  }[] = [];

  results: {
    title: string;
    author: string;
    category: string;
    snippet: string;
    url: string;
    published: string;
  }[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

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

    this.loadCategories();
  }

  applyFilters() {
    this.currentPage = 1;
    if (this.query.trim()) {
      this.fetchResults(this.query);
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateResultsPage();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  fetchResults(query: string) {
    const token = localStorage.getItem('token');
    const body: any = { query };

    if (this.dateRange) {
      body.date_range = this.dateRange;
      if (this.dateRange === 'custom') {
        body.custom_start = this.customStart;
        body.custom_end = this.customEnd;
      }
    }

    if (this.category) body.category = this.category;
    if (this.author) body.author = this.author;

    const url = token
      ? 'http://127.0.0.1:5000/search_logged'
      : 'http://127.0.0.1:5000/search';

    const options = token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};

    this.http.post<any>(url, body, options).subscribe({
      next: (res) => {
        this.allResults = res.results.map((item: any) => ({
          title: item.title || 'Sem título',
          author: item.authors?.join(', ') || 'Autor desconhecido',
          category: item.category || 'Sem categoria',
          snippet: item.summary?.slice(0, 800) || 'Sem descrição',
          url: item.url || '#',
          published: item.published || new Date().toISOString(),
        }));

        this.totalItems = this.allResults.length;
        this.updateResultsPage();
      },
      error: (err) => {
        console.error('Erro na busca:', err);
      },
    });
  }

  updateResultsPage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.results = this.allResults.slice(startIndex, endIndex);
  }

  getCategoryName(categoryId: string): string {
    const found = this.categories.find(c => c.id === categoryId);
    return found ? found.name : categoryId;
  }

  loadCategories() {
    this.http.get<any>('http://127.0.0.1:5000/categories').subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
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
