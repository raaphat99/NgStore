import { AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { UsersService } from "src/app/Services/users.service";
import { IUser } from "src/app/ViewModels/iuser";

export function emailExistCheck(usersService: UsersService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return usersService.getUserByEmail(control.value)
            .pipe(map((user: IUser[]) => {
                return (user[0] && user[0].email) ? { "alreadyExist": true } : null;
            }));
    };
}