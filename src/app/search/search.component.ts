import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DateRelativePipe } from '../shared/pipes/date-relative.pipe';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DateRelativePipe],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query = '';
  categories: { id: string; name: string; count: number }[] = [];
  categoryMap = new Map<string, string>(); // ✅ para mapeamento rápido
  recommendations: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Buscar categorias
    this.http.get<{ id: string; name: string; count: number }[]>('http://localhost:5000/categories')
      .subscribe({
        next: (data) => {
          console.log('Categorias recebidas:', data);
          this.categories = data;
          this.categoryMap = new Map(data.map(c => [c.id, c.name])); // ✅ popula map
        },
        error: (err) => {
          console.error('Erro ao buscar categorias:', err);
        }
      });

    // Buscar recomendações se o token estiver presente
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get<any>('http://localhost:5000/recommendations', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (res) => {
          console.log('Recomendações recebidas:', res.results);
          this.recommendations = res.results;
        },
        error: (err) => {
          console.error('Erro ao buscar recomendações:', err);
        }
      });
    }
  }

  getCategoryName(categoryId: string): string {
    return this.categoryMap.get(categoryId) || 'Sem categoria';
  }

  search() {
    if (this.query.trim()) {
      this.router.navigate(['/results'], { queryParams: { q: this.query } });
    }
  }
}
