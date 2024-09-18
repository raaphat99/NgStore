import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatch(group: AbstractControl): ValidationErrors | null {
    let password = group.get("password")?.value;
    let confirm = group.get("confirmPassword")?.value;
    if (password !== confirm) {
        return { "noMatch": true };
    }
    return null;
}