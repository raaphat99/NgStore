import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { ProductsService } from 'src/app/Services/static-products';
import { IProduct } from 'src/app/ViewModels/iproduct';
import { ProductsComponent } from '../Products/products.component';
import { Location } from '@angular/common';
import { ApiProductsService } from 'src/app/Services/api-products.service';
import { AuthorizationGuard } from 'src/app/Guards/authorization-guard.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  // Properties
  productList: IProduct[] = [];
  numberOfProducts: number;
  currentProductID!: number;
  product: IProduct | undefined;

  // Constructor
  constructor(private productsService: ApiProductsService, private activatedRoute: ActivatedRoute, private router: Router, private location: Location) {
    this.numberOfProducts = this.productsService.getProductArrayLength();
  }

  // Hooks
  ngOnInit(): void {
    /*
    The snapshot property returns the current value of the route. It does not contain any observable. 
    Hence if the value changes after you retrieve the values, you will not be notified of it.
    That's why we have got to use paramMap observable and subscribe to it to listen for changes.
    */
    // this.caughtProductID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.currentProductID = Number(paramMap.get('id'));
      this.productsService.getProductByID(this.currentProductID).subscribe((product) => {
        this.product = product;
      })
    });
    this.productsService.getAllProducts().subscribe((products) => {
      this.productList = products;
    })
  }

  // Methods
  goBack() {
    // we use location.back() to go back to the previous URL.
    this.location.back();
  }
  
  getPrevProduct() {
    this.product = this.productsService.getPreviousProduct(this.currentProductID);
    this.router.navigate(['/product', this.product.id]);
  }
  getNextProduct() {
    this.product = this.productsService.getNextProduct(this.currentProductID);
    this.router.navigate(['/product', this.product.id]);
  }

}
