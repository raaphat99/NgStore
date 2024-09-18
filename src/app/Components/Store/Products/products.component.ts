import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiProductsService } from 'src/app/Services/api-products.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { ProductsService } from 'src/app/Services/static-products';
import { IProduct } from 'src/app/ViewModels/iproduct';
import { RecievedProducts } from 'src/app/ViewModels/recieved-products';
import { ShoppingCartItems } from 'src/app/ViewModels/shopping-cart-items';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnChanges {
  // Properties
  productList: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  @Input() categoryID: number;
  shoppingCartItem: ShoppingCartItems;
  addItemToCart: boolean;
  totalPriceForAllItems: number;
  @Output() amountChanged: EventEmitter<any> = new EventEmitter();
  clientName: string;
  failedPurchase: boolean;
  counter: number;

  // Constructor
  constructor(private productsService: ApiProductsService,
    private snackbar: SnackbarService,
  ) {
    this.totalPriceForAllItems = 0;
    this.addItemToCart = false;
    this.failedPurchase = false;
    this.clientName = "Ahmed";
    this.shoppingCartItem = {} as ShoppingCartItems;
    this.categoryID = 0;
    this.counter = 1;
  }

  // Hooks
  ngOnInit() {
    this.getProducts();
  }

  ngOnChanges() {
    this.getProductsByCategoryID();
  }

  // Methods
  private getProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.productList = products;
      this.filteredProducts = products;
    })
  }

  private getProductsByCategoryID() {
    if (this.categoryID == 0) {
      this.filteredProducts = this.productList;
    } else {
      this.productsService.getProductByCategoryID(this.categoryID).subscribe((products) => {
        this.filteredProducts = products;
      })
    }
  }

  increment(prdID: any) {
    /*     let recievedProduct: IProduct;
        this.productsService.getProductByID(prdID).subscribe((product) => {
          new RecievedProducts(product.id, product.name, product.quantity, product.price, product.amount, product.img, product.categoryID).itemCount = 2;
        })  */
  }
  decrement(prdID: any) {
    /* for (let product of this.productList) {
      if (product.id == prdID) {
        --product.amount;
        break;
      }
    } */
  }
  addToCart(prdID: any, numOfItems: any) {
    for (let product of this.productList) {
      if (product.id === prdID) {
        if (numOfItems <= product.quantity) {
          let totalPrice = product.amount * product.price;
          product.quantity -= numOfItems;
          this.shoppingCartItem = new ShoppingCartItems(prdID, product.name, product.amount, product.price);
          this.totalPriceForAllItems += totalPrice;
          this.amountChanged.emit(this.shoppingCartItem);
          this.failedPurchase = false;
          this.addItemToCart = true;
          break;
        } else {
          this.failedPurchase = true;
        }
      }
    }
  }

  deleteProduct(id: any) {
    let userConfirmation = confirm("Are you sure to delete this product?");
    if (userConfirmation) {
      this.productsService.deleteProduct(id).subscribe(() => {
        // get products after deleting an item without the need of reloading the component.
        this.getProducts();
        this.snackbar.deleteProductSuccessMessage();
      },
        (error) => {
          console.log("An error has occurred during product deletion!!", error)
        }
      )
    }
  }
}


