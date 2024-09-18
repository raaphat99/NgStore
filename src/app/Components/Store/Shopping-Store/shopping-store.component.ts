import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiProductsService } from 'src/app/Services/api-products.service';
import { CategoriesService } from 'src/app/Services/categories.service';
import { ProductsService } from 'src/app/Services/static-products';
import { DiscountOffers } from 'src/app/ViewModels/discount-offers';
import { ICategory } from 'src/app/ViewModels/icategory';
import { IProduct } from 'src/app/ViewModels/iproduct';
import { ShoppingCartItems } from 'src/app/ViewModels/shopping-cart-items';
import { Store } from 'src/app/ViewModels/store';
import { ProductsComponent } from '../Products/products.component';

@Component({
  selector: 'app-shopping-store',
  templateUrl: './shopping-store.component.html',
  styleUrls: ['./shopping-store.component.scss']
})
export class ShoppingStoreComponent implements OnInit {
  // Properties
  // !: not-null assertion operator. It indicates that the property will never be null.
  @ViewChild(ProductsComponent) 
  productsComponent!: ProductsComponent;
  productList: IProduct[] = [];
  shoppingCartItems: ShoppingCartItems[] = [];
  discount: DiscountOffers;
  store = new Store();
  clientName: string;
  categoryList: ICategory[] = [];
  selectedCategoryID: number;
  nationalID: string;
  creditCardNumber: string;
  isPurchased: boolean;
  purchaseDate: Date;

  // Constructor
  constructor(private productsService: ApiProductsService, private categoriesService: CategoriesService) {
    this.isPurchased = false;
    this.purchaseDate = new Date();
    this.discount = DiscountOffers.FifteenPercent;
    this.selectedCategoryID = 0;
    this.clientName = "Ahmed";
    this.nationalID = "29909051202977";
    this.creditCardNumber = "2997617145751202";
    /* this.categoryList = [
      {
        id: 101,
        name: "Electronic Devices",
      }, 
      {
        id: 102,
        name: "Clothing, Shoes and Jewelry"
      },
      {
        id: 103,
        name: "Home & Kitchen"
      },
    ] */

  }
  
  // Hooks
  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categoryList = categories;
    })
    this.productsService.getAllProducts().subscribe((products) => {
      this.productList = products;
    })
  }

  // Methods
  amountChangedHandler(obj: any) {
    this.shoppingCartItems.push(obj);
  }
  deleteItemFromCart(id: any, amount: any, totalPriceForThisItem: any) {
    for (let i=0; i<this.shoppingCartItems.length; i++) {
      if (this.shoppingCartItems[i].prdID == id) {
        // remove the selected item from the shoppingCartItems array and hence remove its row from the view.
        this.shoppingCartItems.splice(i, 1);
        // reset the available quantity
        for (let product of this.productList) {
          if (product.id == id) {
            product.quantity += amount;
          }
        }
        // reset the totalPriceForAllItems
        this.productsComponent.totalPriceForAllItems -= totalPriceForThisItem;
        // remove the cart from the view if it is empty
        if (!this.shoppingCartItems.length) {
          this.productsComponent.addItemToCart = false;
        }
        break;
      }
    }
  }
  purchase() {
    this.isPurchased = true;
    this.purchaseDate = new Date();
  }
}
