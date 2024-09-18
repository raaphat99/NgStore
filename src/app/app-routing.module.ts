import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/About/about.component';
import { ContactUsComponent } from './Components/Contact-us/contact-us.component';
import { Error404NotFoundComponent } from './Components/Error404-Not-Found/error404-not-found.component';
import { HomeComponent } from './Components/Home/home.component';
import { LoginComponent } from './Components/Login/login.component';
import { MainLayoutComponent } from './Components/Main-Layout/main-layout.component';
import { NewProductComponent } from './Components/Store/New-Product/new-product.component';
import { ProductDetailsComponent } from './Components/Store/Product-Details/product-details.component';
import { ProductsCardsComponent } from './Components/Store/Products-Cards/products-cards.component';
import { ShoppingStoreComponent } from './Components/Store/Shopping-Store/shopping-store.component';
import { UserRegistrationFormComponent } from './Forms/user-registration-form/user-registration-form.component';
import { AuthorizationGuard } from './Guards/authorization-guard.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegistrationFormComponent },

  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'products', component: ShoppingStoreComponent, canActivate: [AuthorizationGuard] },
      { path: 'products/details/:id', component: ProductDetailsComponent },
      { path: 'product/cards', component: ProductsCardsComponent },
      { path: 'admin/insert-product', component: NewProductComponent, canActivate: [AuthorizationGuard] },
      {
        path: 'users',
        loadChildren: () => import('src/app/UserModule/user.module').then(m => m.UserModule)
      },
    ]
  },

  // This path must be the last. Because this array works by first-match wins strategy.
  { path: '**', component: Error404NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
