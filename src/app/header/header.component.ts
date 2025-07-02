import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ importe isso!
import { AuthService } from '../services/auth.service'; // ajuste o caminho se necessário

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule], // ✅ adicione aqui
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToSignIn(): void {
    this.router.navigate(['/signIn']);
  }

  navigateToSignUp(): void {
    this.router.navigate(['/signUp']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signIn']);
  }
}
