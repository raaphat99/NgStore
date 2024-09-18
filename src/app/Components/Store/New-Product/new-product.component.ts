import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from 'src/app/ViewModels/iproduct';
import { Observable, Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProductsService } from 'src/app/Services/api-products.service';
import { CategoriesService } from 'src/app/Services/categories.service';
import { ICategory } from 'src/app/ViewModels/icategory';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit, OnDestroy {
  // Properties
  subscription!: Subscription;
  recievedCategories: ICategory[] = [];
  insertNew: boolean;
  product!: IProduct;
  recievedProduct!: IProduct;
  // Constructor
  constructor(private productsService: ApiProductsService, private categoriesService: CategoriesService,
    private snackbar: SnackbarService, private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.product = {
        categoryID: 0,
      } as IProduct;
      this.insertNew = true;
  }

  // Hooks
  ngOnInit(): void {
    this.subscription = this.categoriesService.getAllCategories().subscribe((categories) => {
      this.recievedCategories = categories;
      // console.log(this.recievedCategories) // returns Array(3)
    })

    this.activatedRoute.queryParamMap.subscribe((params) => {
      if (params.has('prdID') && params.get('prdID')) {
        this.productsService.getProductByID(this.getProductIDFromURL()).subscribe((product) => {
          // Do form population through the two way binding
          this.product = product;
          this.insertNew = false;
        })
      }
    })
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  // Methods

  insertProduct() {
    this.productsService.addProduct(this.product).subscribe(
      (product) => {
        this.snackbar.newProductSuccessMessage();
        this.router.navigate(['/products']);
      },
      (error) => {
        console.log("An error has occurred during product insertion!!", error)
      }
    );
  }

  updateProduct() {
    this.productsService.updateProduct(this.product).subscribe(
      (product) => {
        this.snackbar.updateProductSuccessMessage();
        this.router.navigate(['/products']);
      },
      (error) => {
        console.log("An error has occurred during product updation!!", error)
      }
    );    
  }

  /*  private getProductByID(id: number): IProduct {
     let recievedProduct!: IProduct;
     // this.productsService.getProductByID(id).subscribe((product) => {
     //   this.recievedProduct = product;
     //   console.log("recieved product (i): ", recievedProduct); // returns product
     // })
     console.log("recieved product (ii): ", recievedProduct); // returns undefined!
     return recievedProduct;
   } */

  private getProductIDFromURL(): number {
    let recievedID;
    this.activatedRoute.queryParamMap.subscribe((params) => {
      recievedID = params.get('prdID');
    })
    // console.log("recieved id: ", recievedID);
    return Number(recievedID);
  }

/*   private populateForm() {
    this.product = this.recievedProduct;
  } */
}
