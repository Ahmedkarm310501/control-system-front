import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationStart } from '@angular/router';
import { filter, take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DissAllowGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    // console.log(this.router.getCurrentNavigation()?.trigger);
    if (
      this.router.getCurrentNavigation()?.extras?.state &&
      'setup' in this.router.getCurrentNavigation()?.extras?.state
    ) {
      return true;
    } else {
      if (this.authService.isUserLoggedIn()) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }
  }
}
