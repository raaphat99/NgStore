import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IUser } from '../ViewModels/iuser';
import { environment } from 'src/enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Properties
  isLoggedSubject = new Subject<boolean>();
  httpOptions: any;
  // Constructor
  constructor(private router: Router, private http: HttpClient) {
    this.isLoggedSubject.next(this.loggingStatus());
    this.httpOptions = {
      'headers': new HttpHeaders(
        {
          'Content-Type': 'application/json',
        }
      )
    }
  }

  // Methods

  register(user: IUser) {
    let body = JSON.stringify(user);
    // Post method parses the body of the response as JSON and returns it.
    return this.http.post<IUser>(`${environment.config.baseURL}/users`, body, this.httpOptions)
  }

  login(email: string, password: string, token: string): void {
    if (email == "ahmed@gmail.com" && password == 'ahmed1999') {
      localStorage.setItem('token', token);
      this.router.navigate(['/home']);
      this.isLoggedSubject.next(true);
    } else {
      alert("Email or password doesn't match!!")
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.isLoggedSubject.next(false);
  }
  loggingStatus(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
