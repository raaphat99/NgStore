import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdvertisementsService } from 'src/app/Services/advertisements.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Properties
  advertisements: string[] = [];
  subscription!: Subscription;
  // Constructor
  constructor(private adsService: AdvertisementsService, private snackBar: SnackbarService) {

  }
  // Hooks
  ngOnInit() {
    this.subscription = this.adsService.adsObservable.subscribe(
      (value) => this.advertisements.push(value),
      // (error) => console.log(error),
      // () => console.log("Completed")
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // Methods
  validateAccess() {
    this.snackBar.validateAccess();
  }
  

}
