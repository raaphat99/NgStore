import { Component, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { emailExistCheck } from 'src/app/CustomValidators/emailExistCheck.validator';
import { passwordMatch } from 'src/app/CustomValidators/passwordMatch.validator';

import { AuthenticationService } from 'src/app/Services/authentication.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { UsersService } from 'src/app/Services/users.service';
import { IUser } from 'src/app/ViewModels/iuser';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  // Properties
  userRegistrationForm: any;
  usersList!: IUser[];
  existedEmails: string[] = [];
  subscription!: Subscription;
  specificDeliveryDay: boolean = false;
  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private snackbar: SnackbarService,
    private usersService: UsersService,
  ) {
    // Form Model
    this.userRegistrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email], [emailExistCheck(this.usersService)]],
      phoneNumber: this.formBuilder.array(
        [this.formBuilder.control('', [Validators.required, Validators.pattern('[0]\[0-9]{10}')])]
      ),
      address: this.formBuilder.group({
        city: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        street: ['', [Validators.required]],
      }),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      deliveryOptions: ['', [Validators.required]],
      selectedDay: [''],
    }, {
      validators: [passwordMatch]
    })
  }

  // Hooks
  ngOnInit(): void {
    this.deliveryOptions.valueChanges.subscribe((value: any) => {
      this.changeDeliveryValidators(value);
    })
  }

  // Getters
  get fullName() {
    return this.userRegistrationForm.get('fullName');
  }
  get email() {
    return this.userRegistrationForm.get('email');
  }
  get phoneNumber() {
    return this.userRegistrationForm.get('phoneNumber') as FormArray;
  }
  get address() {
    return this.userRegistrationForm.get('address');
  }
  get city() {
    return this.userRegistrationForm.get('address').get('city');
  }
  get postalCode() {
    return this.userRegistrationForm.get('address').get('postalCode');
  }
  get street() {
    return this.userRegistrationForm.get('address').get('street');
  }
  get password() {
    return this.userRegistrationForm.get('password');
  }
  get confirmPassword() {
    return this.userRegistrationForm.get('confirmPassword');
  }
  get deliveryOptions() {
    return this.userRegistrationForm.get('deliveryOptions');
  }
  get selectedDay() {
    return this.userRegistrationForm.get('selectedDay');
  }



  // Methods


  // Creates a new form control for an extra phone number and pushes it in phoneNumber array
  addPhoneNumber(): void {
    let control = this.formBuilder.control('', [Validators.required, Validators.pattern('[0]\[0-9]{10}')]);
    this.phoneNumber.push(control);
  }
  // Removes a specified phone number from the array and hence remove its control from the view.
  removePhoneNumber(index: number): void {
    this.phoneNumber.removeAt(index);
  }
  changeDeliveryValidators(value: any) {
    if (value == 'specific') {
      this.specificDeliveryDay = true;
      this.selectedDay.setValidators([Validators.required])
    } else {
      this.specificDeliveryDay = false;
      this.selectedDay.clearValidators()
      this.selectedDay.value = null;
    }
    this.selectedDay.updateValueAndValidity();
  }
  onSubmit(): void {
    let newUser = this.userRegistrationForm.value as IUser;
    // console.log(newUser);
    this.auth.register(newUser).subscribe({
      next: (user) => {
        this.snackbar.userRegistrationSuccessMessage();
        location.reload();
        // TO-DO
          // 1- navigate the user to login page instead of reloading the component
          // 2- Adjust the logic in login function (make it dynamic and let it fetch the new registered user from the db)
          // 3- if an email doesn't exist, show an alert and register button that redirects to the registration form when clicked.
      },
      error: (error) => {
        console.log("An error has occurred while registration!", error)
      },
    });
  }
}
