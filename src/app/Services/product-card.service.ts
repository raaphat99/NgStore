import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICards } from '../ViewModels/icards';

@Injectable({
  providedIn: 'root'
})
export class ProductCardService {

  constructor(private http: HttpClient) { }

  // Methods
  getAllProducts(): Observable<ICards> {
    return this.http.get<ICards>('https://reqres.in/api/product');
  }
}
