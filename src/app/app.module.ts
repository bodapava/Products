import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { MatTableModule } from '@angular/material/table';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './authguard.service';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NewProductComponent,
    NavbarComponent,
    ProductCatalogComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ShoppingCartComponent,
    LoginComponent,
    CheckOutComponent,
    OrderSuccessComponent,
  ],
  providers: [AuthguardService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    MatTableModule,
    RouterModule.forRoot([
      { path: 'home', component: ProductCatalogComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'login', component: LoginComponent },
      { path: 'checkout', component: CheckOutComponent },
      { path: 'ordersuccess/:id', component: OrderSuccessComponent },
      { path: 'products/new', component: NewProductComponent },
      { path: 'products/:id', component: NewProductComponent },
      {
        path: 'cart',
        component: ShoppingCartComponent,
        canActivate: [AuthguardService],
      },
    ]),
    NgbModule,
  ],
})
export class AppModule {
  constructor() {
    const afApp = initializeApp(environment.firebase);
  }
}
