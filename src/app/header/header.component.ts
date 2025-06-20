import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public navigateToHome(): void {
    window.location.href = '/';
  }
  public navigateToSignIn(): void {
    window.location.href = '/signIn';
  }
}
