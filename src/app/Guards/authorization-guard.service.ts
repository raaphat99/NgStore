import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  // Properties
  private subscribtion!: Subscription;
  private isUserLogged!: boolean;
  constructor(private auth: AuthenticationService, private router: Router) {
    this.isUserLogged = this.auth.loggingStatus();
    // This must be in here. If put in ngOnInit, it wouldn't feel the change of user logging status!!
    // NOTE: ngOnInit is a life cycle hook called by Angular when a component is created.
    // In services, we can't use them.
    this.subscribtion = this.auth.isLoggedSubject.subscribe((status) => {
      this.isUserLogged = status;
    });
  }

  // Methods
  canActivate(): boolean {
    // console.log("User status", this.isUserLogged);
    if (this.isUserLogged) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
