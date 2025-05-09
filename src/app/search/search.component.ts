import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query = '';

  constructor(private router: Router) {}

  search() {
    if (this.query.trim()) {
      this.router.navigate(['/results'], { queryParams: { q: this.query } });
    }
  }
}
