import { Component, inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  authService: AuthService = inject(AuthService);

  onLogOut = this.authService.onLogOut;
}
