import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { sanitizeIdentifier } from '@angular/compiler';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  shoppingcartNumber!: number;
  carts!: any;
  user: any;
  constructor(
    private cartService: ShoppingCartService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    //this.cartService.
    const auth = getAuth();
    this.carts = this.cartService.getCart().then((data) => {
      this.carts = data;
      console.log('Navbar carts label is called', data);
      return this.carts;
    });
    this.shoppingcartNumber = 0;
    this.carts.then((cart: any) => {
      console.log('for loop', cart, this.shoppingcartNumber);
      for (let key in cart) {
        this.shoppingcartNumber += cart[key].quantity;
      }
    });

    onAuthStateChanged(auth, (user) => {
      user?.displayName;
      console.log('authstate changed', user?.displayName);
      this.user = user?.displayName;
      return user?.displayName;
    });
  }

  logOut() {
    this.auth.logOut();
  }
}
