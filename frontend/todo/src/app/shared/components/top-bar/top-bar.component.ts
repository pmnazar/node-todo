import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-top-bar',
  imports: [AsyncPipe, NgOptimizedImage],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;
  logoImg = 'assets/logo.png';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.user$ = this.userService.getCurrentUser().pipe(map((res) => res));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
