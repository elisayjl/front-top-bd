import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || '';
      this.results = this.mockResults();
    });
  }

  mockResults() {
    return [
      {
        title: 'Nome do artigo 1',
        author: 'Autor 1',
        snippet: 'Descrição breve 1',
      },
      {
        title: 'Nome do artigo 2',
        author: 'Autor 2',
        snippet: 'Descrição breve 2',
      },
      {
        title: 'Nome do artigo 3',
        author: 'Autor 3',
        snippet: 'Descrição breve 3',
      },
    ];
  }
}
