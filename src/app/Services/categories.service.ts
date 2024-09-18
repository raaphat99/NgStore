import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../ViewModels/icategory';
import { environment } from 'src/enviroments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  // Constructor
  constructor(private http: HttpClient) { }

  // Methods
  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.config.baseURL}/categories`);
  }
}
