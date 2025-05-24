import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query = '';
  categories: { id: string; name: string; count: number }[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ id: string; name: string; count: number }[]>('http://localhost:5000/categories')
      .subscribe({
        next: (data) => {
          console.log('Categorias recebidas:', data);
          this.categories = data;
        },
        error: (err) => {
          console.error('Erro ao buscar categorias:', err);
        }
      });
  }
  
  search() {
    if (this.query.trim()) {
      this.router.navigate(['/results'], { queryParams: { q: this.query } });
    }
  }
}





