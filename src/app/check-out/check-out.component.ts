import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCartItem } from '../shopping-cart-item';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CheckOutService } from '../check-out.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  cart!: any;
  cartItems!: any[];
  cartitemsNumber: number = 0;
  total!: number;
  userId!: any;
  constructor(
    private cartService: ShoppingCartService,
    private checkOutService: CheckOutService,
    private router: Router
  ) {}
  ngOnInit() {
    this.cartService.getCart().then((data) => {
      if (!data) return;
      console.log('checkout cart', data);
      console.log('checkout cart', Object.entries(data));
      this.cartItems = Object.entries(data);
      this.cart = data;
      this.total = 0;
      this.cartitemsNumber = 0;
      for (let i in data) {
        this.cartitemsNumber += data[i].quantity;
        this.total += data[i].product.price * data[i].quantity;
      }
    });
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log('authstate changed', user?.uid);
      this.userId = user?.uid;
      console.log('auth guard', this.userId);
    });
  }
  checkOutForm: any = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    address1: new FormControl('', [Validators.required, Validators.min(4)]),
    city: new FormControl('', Validators.required),
  });
  get name() {
    return this.checkOutForm.get('name');
  }
  get address1() {
    return this.checkOutForm.get('address1');
  }
  get city() {
    return this.checkOutForm.get('city');
  }
  onSubmit(f: any) {
    console.log(f.value);
    let order = {
      datePlaced: new Date().getTime(),
      userid: this.userId,
      shipping: f.value,
      items: this.cartItems.map((item) => {
        return {
          product: {
            title: item[1]['product'].title,
            imageUrl: item[1]['product'].imageUrl,
            price: item[1]['product'].price,
          },
          quantity: item[1]['quantity'],
        };
      }),
    };
    let result = this.checkOutService.proceedCheckOut(order);
    this.router.navigate(['/ordersuccess', result]);
    this.checkOutForm.reset();
  }
}
