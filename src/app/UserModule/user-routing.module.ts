import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { EditProfleComponent } from './Components/edit-profle/edit-profle.component';
import { Error404NotFoundComponent } from 'src/app/Components/Error404-Not-Found/error404-not-found.component';
import { AuthorizationGuard } from '../Guards/authorization-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'user-profile', pathMatch: 'full' },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthorizationGuard] },
  { path: 'edit-profile', component: EditProfleComponent, canActivate: [AuthorizationGuard] },
  { path: '**', component: Error404NotFoundComponent },
]

@NgModule({
  // Since this is a lazy-loaded module, the routes we specified above will automatically become the children routes of 'users'
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
