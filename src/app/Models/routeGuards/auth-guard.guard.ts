import { inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

export const authGuardGuard = (
  route: ActivatedRoute,
  state: RouterStateSnapshot
):
  | boolean
  | UrlTree
  | Promise<boolean | UrlTree>
  | Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.loggerObserver.pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/']);
      }
      return isLoggedIn;
    })
  );
};
