import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard'
})
export class CreditCardPipe implements PipeTransform {

  transform(digits: string): string {
    let formattedCreditCardNumber:string = digits.slice(0, 4) + " – " + digits.slice(4, 8) + " –  " + digits.slice(8, 12) + " –  " + digits.slice(12, 16);
    return formattedCreditCardNumber;
  }

}
