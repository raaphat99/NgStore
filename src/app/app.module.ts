import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Header/header.component';
import { ProductsComponent } from './Components/Store/Products/products.component';
import { FooterComponent } from './Components/Footer/footer.component';
import { SidebarComponent } from './Components/Sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardDirective } from './Directives/product-card.directive';
import { CreditCardPipe } from './Pipes/credit-card.pipe';
import { NationalIDToBirthDatePipe } from './Pipes/national-idto-birth-date.pipe';
import { ShoppingStoreComponent } from './Components/Store/Shopping-Store/shopping-store.component';
import { ProductDetailsComponent } from './Components/Store/Product-Details/product-details.component';
import { HomeComponent } from './Components/Home/home.component';
import { AboutComponent } from './Components/About/about.component';
import { ContactUsComponent } from './Components/Contact-us/contact-us.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { Error404NotFoundComponent } from './Components/Error404-Not-Found/error404-not-found.component';
import { LoginComponent } from './Components/Login/login.component';
import { ProductsService } from './Services/static-products';
import { AuthorizationGuard } from './Guards/authorization-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NewProductComponent } from './Components/Store/New-Product/new-product.component';
import { ProductsCardsComponent } from './Components/Store/Products-Cards/products-cards.component';
import { UserRegistrationFormComponent } from './Forms/user-registration-form/user-registration-form.component';
import { MainLayoutComponent } from './Components/Main-Layout/main-layout.component';

@NgModule({
  // Declarations are for Components, Directives & Pipes while Providers are for Services.
  // You should add only those, which belong to this module. The Component cannot belong to more than one module.
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    FooterComponent,
    SidebarComponent,
    ProductCardDirective,
    CreditCardPipe,
    NationalIDToBirthDatePipe,
    ShoppingStoreComponent,
    ProductDetailsComponent,
    HomeComponent,
    AboutComponent,
    ContactUsComponent,
    Error404NotFoundComponent,
    LoginComponent,
    NewProductComponent,
    ProductsCardsComponent,
    UserRegistrationFormComponent,
    MainLayoutComponent,
  ],
  // If we want this ngModule to require any feature or functionality from an external module,
  // then those modules need to be imported here.
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    HttpClientModule,
    // Must be called last
    AppRoutingModule,
  ],
  // Providers are for Services.
  // The services provided in the Root Module or in any of the eagerly loaded feature modules are app-scoped. i.e they are available for injection in every component in the entire application.
  // However, this rule does not apply to the lazy loaded modules. The lazy loaded modules gets their own injector and providers. The services provided in the lazy loaded modules are available only in the lazy loaded module.
  providers: [ProductsService, AuthorizationGuard],
  // The main component of this module (called the root module, that is loaded when the Angular App starts), which needs to be loaded when the module is loaded is specified here.
  // If the module is not the root module, then we should keep this blank.
  bootstrap: [AppComponent]
})
export class AppModule { }
