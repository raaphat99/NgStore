import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { IUser } from '../ViewModels/iuser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.config.baseURL}/users`);
  }

  getUserByEmail(email: string): Observable<IUser[]> {
    const getError = new Error('Unexpected error has been caught while sending GET request!');
    return this.http
      .get<IUser[]>(`${environment.config.baseURL}/users?email=${email}`)
      .pipe(
        retry(2),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => getError);
        })
      )
  }

}
