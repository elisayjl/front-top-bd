import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    console.log('Submit chamado');
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:5000/login', loginData).subscribe({
      next: (response: any) => {
        console.log('Login bem-sucedido', response);

        // 👉 Salva o token no localStorage
        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erro no login', error);
        alert('Usuário ou senha inválidos');
      }
    });
  }

  public navigateToSignIn(): void {
    window.location.href = '/signIn'; 
  }

  public navigateToSignUp(): void {
    window.location.href = '/signUp';
  }

}



