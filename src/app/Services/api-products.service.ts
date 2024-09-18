import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { IProduct } from '../ViewModels/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService implements OnInit {

  // Properties
  productList: IProduct[] = [];
  httpOptions;
  // Constructor
  constructor(private http: HttpClient) {
    this.httpOptions = {
      'headers': new HttpHeaders(
        {
          'Content-Type': 'application/json',
        }
      )
    }
  }

  // Hooks
  ngOnInit(): void {
    this.getAllProducts().subscribe((products) => {
      this.productList = products;
    })
  }

  // Methods
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.config.baseURL}/products`);
  }

  getProductByCategoryID(id: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.config.baseURL}/products?categoryID=${id}`);
  }

  getProductByID(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.config.baseURL}/products/${id}`);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    let body = JSON.stringify(product);
    // Post method parses the body of the response as JSON and returns it.
    return this.http.post<IProduct>(`${environment.config.baseURL}/products`, body, this.httpOptions)
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    let body = JSON.stringify(product);
    return this.http.put<IProduct>(`${environment.config.baseURL}/products/${product.id}`, body, this.httpOptions)
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${environment.config.baseURL}/products/${id}`);
  }

  getPreviousProduct(id: number): IProduct {
    let currentPrdIndex = this.productList.findIndex(item => item.id == id);
    return this.productList[currentPrdIndex - 1];
  }
  getNextProduct(id: number): IProduct {
    let currentPrdIndex = this.productList.findIndex(item => item.id == id);
    return this.productList[currentPrdIndex + 1];
  }

  getProductArrayLength() {
    return this.productList.length;
  }
}
