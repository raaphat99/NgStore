import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nationalIDToBirthDate'
})
export class NationalIDToBirthDatePipe implements PipeTransform {

  transform(id: string): string {
    let centuryOfBirth: string = "19";
    let yearOfBirth: string = id.slice(1, 3);
    let monthOfBirth: string = id.slice(3, 5);
    let dayOfBirth: string = id.slice(5, 7);
    
    let dateOfBirth:string = centuryOfBirth + yearOfBirth + "/" + monthOfBirth + "/" + dayOfBirth;
    return dateOfBirth;
  }

}
