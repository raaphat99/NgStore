import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductCardService } from 'src/app/Services/product-card.service';
import { ICardData } from 'src/app/ViewModels/icard-data';
import { ICards } from 'src/app/ViewModels/icards';

@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.scss']
})
export class ProductsCardsComponent implements OnInit, OnDestroy {
  subscribtion!: Subscription;
  products: ICardData[] = [];

  constructor(private productCardService: ProductCardService) {

  }

  // Hooks
  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  // Methods
  private getProducts() {
    this.subscribtion = this.productCardService.getAllProducts().subscribe((products: ICards) => {
      this.products = products.data;
    })
  }

}
