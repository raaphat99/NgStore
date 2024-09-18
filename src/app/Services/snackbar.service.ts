import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  // Properties
  isLogged!: boolean;
  subscribtion!: Subscription;

  // Constructor
  constructor(private auth: AuthenticationService, private snackBar: MatSnackBar) {
    this.isLogged = this.auth.loggingStatus();
    this.subscribtion = this.auth.isLoggedSubject.subscribe((status) => {
      this.isLogged = status;
    })
  }

  // Methods
  validateAccess() {
    if (!this.isLogged) {
      this.snackBar.open("You must login to access products page!", "OK", { duration: 3000 })
    }
  }
  showLogoutMessage() {
    this.snackBar.open("You have successfully logged out!", "OK", { duration: 3000 })
  }
  newProductSuccessMessage() {
    this.snackBar.open("New Product has been added successfully", "OK", { duration: 3000 })
  }
  updateProductSuccessMessage() {
    this.snackBar.open("Product has been updated successfully", "OK", { duration: 3000 })
  }
  deleteProductSuccessMessage() {
    this.snackBar.open("Product has been deleted successfully", "OK", { duration: 3000 })
  }
  userRegistrationSuccessMessage() {
    this.snackBar.open("You have successfully registered a new account", "OK", { duration: 3000 })
  }
}
