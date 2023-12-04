import {  inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    CanMatchFn,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
  } from '@angular/router';
  import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';



const checkAuthStatus = (): boolean | Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
   
    return authService.checkAuthentication()
    .pipe(
      tap((isAuthenticated) => console.log('Authenticated', isAuthenticated)),
      
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          router.navigate(['/auth/login']);
        }
      })
    );
  };


export const canActivateGuard: CanActivateFn = (
    //Hay que tener en cuenta el tipado CanActiveFn
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    console.log('CanActivate');
    console.log({ route, state });
   
    return checkAuthStatus();
  };
   
  export const canMatchGuard: CanMatchFn = (
    //Tipado CanMatchFN
    route: Route,
    segments: UrlSegment[]
  ) => {
    console.log('CanMatch');
    console.log({ route, segments });
   
    return checkAuthStatus();
  };

//function checkAuthStatus(): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
  //  throw new Error('Function not implemented.');
//}
