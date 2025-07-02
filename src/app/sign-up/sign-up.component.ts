import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string = '';
  name: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const registerData = {
      username: this.username,
      name: this.name,
      password: this.password
    };

    this.http.post('http://localhost:5000/register', registerData).subscribe({
      next: (response: any) => {
        console.log('Registro bem-sucedido', response);
        this.router.navigate(['/signIn']);
      },
      error: (error) => {
        console.error('Erro no registro', error);
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
