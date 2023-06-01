import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  public isLoggedIn$: BehaviorSubject<boolean>;

  constructor(private auth: AccountService, private router: Router) { 
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.auth.isLoggedIn()) {   //if this returns false
      alert("You need to Login first......")
      this.router.navigate(['login']);
      // return false
    }
    return this.auth.isLoggedIn();

  }

  // login(){
  //   this.router.navigate(['/login']);
  //   localStorage.setItem('loggedIn', 'true');
  //   this.isLoggedIn$.next(true);
  // }
  // logout() {
  //   this.router.navigate(['/login']);
  //   localStorage.clear();
  //   localStorage.setItem('loggedIn', 'false');
  //   this.isLoggedIn$.next(false);
  // }

}
