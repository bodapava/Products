import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, update } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  constructor(private shoppingCartService: ShoppingCartService) {}

  proceedCheckOut(order: any) {
    console.log('checkout Service', order);
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    const newCheckOutKey = push(ref(db)).key;
    update(ref(db, 'orders/' + newCheckOutKey), order).then((data) => {
      this.shoppingCartService.clearCartItems();
      console.log('Order Service', data);
    });

    return newCheckOutKey;
  }
}
