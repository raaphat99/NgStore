import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { EditProfleComponent } from './Components/edit-profle/edit-profle.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfleComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
