import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy, OnInit {
  // Properties
  isLogged!: boolean;
  subscribtion!: Subscription;
  
  // Constructor
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private snackBar: SnackbarService
  ) {
    this.isLogged = this.auth.loggingStatus();
  }

  // Hooks
  ngOnInit(): void {
    this.subscribtion = this.auth.isLoggedSubject.subscribe((status) => {
      this.isLogged = status;
    });
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  // Methods
  validateAccess() {
    this.snackBar.validateAccess();
  }

  logout() {
    this.auth.logout();
    this.snackBar.showLogoutMessage();
    this.router.navigate(['/login']);
  }
}
