import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  token: string;
  constructor(private auth: AuthenticationService) {
    this.token = '00e7e61db68b'
  }

  // Methods
  getFormValues(obj: any) {
    // console.log(obj);
    this.auth.login(obj['email'], obj['password'], this.token);
  }
}
