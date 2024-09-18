import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nationalID'
})
export class NationalIDPipe implements PipeTransform {

  transform(id: string): string {
    let dateOfBirth:string = id.slice(1, 3) + " – " + id.slice(3, 5) + " –  " + id.slice(5, 7);
    return dateOfBirth;
  }

}
