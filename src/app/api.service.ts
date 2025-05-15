import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  ingest() {
    return this.http.post(`${this.baseUrl}/ingest`, {});
  }

  search(query: string) {
    return this.http.post(`${this.baseUrl}/search`, { query });
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
}
