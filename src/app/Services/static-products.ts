import { EventEmitter, Injectable, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, Observable, Subscription } from 'rxjs';
import { IProduct } from '../ViewModels/iproduct';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService  {
  // Properties
  private productList: IProduct[];
  // Constructor
  constructor() {
    this.productList = [
      {
        id: 1001,
        name: "Laptop",
        quantity: 5,
        price: 5000,
        amount: 1,
        img: "https://picsum.photos/id/8/200",
        categoryID: 101,
      },
      {
        id: 1002,
        name: "Tablet",
        quantity: 10,
        price: 3500,
        amount: 1,
        img: "https://picsum.photos/id/60/200",
        categoryID: 101,
      },
      {
        id: 2001,
        name: "sneaker",
        quantity: 15,
        price: 200,
        amount: 1,
        img: "../../../assets/pexels-ray-piedra-1464625.jpg",
        categoryID: 102,
      },
      {
        id: 2002,
        name: "Lacoste shirt",
        quantity: 20,
        price: 750,
        amount: 1,
        img: "../../../assets/pexels-fahmi-garna-13094146.jpg",
        categoryID: 102,
      },
      {
        id: 3001,
        name: "Refrigerator",
        quantity: 25,
        price: 4000,
        amount: 1,
        img: "../../../assets/nrd-FDQFZHY9iG4-unsplash.jpg",
        categoryID: 103,
      },
      {
        id: 3002,
        name: "Washing Machine",
        quantity: 30,
        price: 2500,
        amount: 1,
        img: "../../../assets/planetcare-5cpBWEl6y6c-unsplash.jpg",
        categoryID: 103,
      },
    ];
    
  }

  // Methods
  getAllProducts() :IProduct[] {
    return this.productList;
  }
  getProductsByCategoryID(categoryID: number): IProduct[] {
    let filteredProducts: IProduct[] = [];
    if (categoryID == 0) 
      filteredProducts = this.productList;
    else 
      filteredProducts = this.productList.filter(item => item.categoryID == categoryID);
    return filteredProducts;
  }
  getProductByID(id: number) {
    let product = this.productList.find(item => item.id == id)
    return product;
  }
  getPreviousProduct(id: number): IProduct {
    let currentPrdIndex = this.productList.findIndex(item => item.id == id);
    return this.productList[currentPrdIndex-1];
  }
  getNextProduct(id: number): IProduct {
    let currentPrdIndex = this.productList.findIndex(item => item.id == id);
    return this.productList[currentPrdIndex+1];
  }
  getProductArrayLength() {
    return this.productList.length;
  }
}
