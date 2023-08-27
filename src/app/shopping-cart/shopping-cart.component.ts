import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../shopping-cart';
import { ShoppingCartItem } from '../shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cartitemsNumber: any;
  items!: any[];
  total!: number;
  constructor(private cartService: ShoppingCartService) {}
  ngOnInit() {
    let cart = this.cartService.getCart();
    this.total = 0;
    cart.then((c) => {
      if (!c) return;
      console.log('shopping cart get cart', c);

      this.cartitemsNumber = 0;
      // console.log('shoppingcart', Object.entries(c.items));
      this.items = Object.entries(c);
      // //this.total += c.items[1]['product'].price * c.items[1]['quantity'];
      for (let i in c) {
        this.cartitemsNumber += c[i].quantity;
        this.total += c[i].product.price * c[i].quantity;
        //console.log('item', item);
      }
    });
  }

  clearCart() {
    this.cartService.clearCartItems();
    this.cartitemsNumber = 0;
    this.items = [];
    this.total = 0;
  }
}
