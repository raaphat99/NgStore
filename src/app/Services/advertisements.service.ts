import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementsService {
  // Properties
  advertisements: string[] = [
    "Up to 60% off 1000s of Gifts From Walmart",
    "Top Toy Brands Under $25",
    "$179 iRobot Roomba 694 Wi-Fi Robot Vacuum + Free Shipping",
    "Free $10 Amazon Credit When You Add Venmo For Prime Members",
    "Lorem ipsum dis amit..",
  ]
  adsObservable = new Observable<string>((observer) => {
    // console.log("We have special offers for you today...");
    let timer: number = 1000;
    for (let ad of this.advertisements) {
      setTimeout(() => {
        observer.next(ad);
      }, timer);
      timer+=1000;
    }
    // setTimeout(() => {
    //   observer.error("Error emitted!!!");
    // }, 3500);
    setTimeout(() => {
      observer.complete();
    }, timer);
  });
  
  // Constructor
  constructor() { }
}
