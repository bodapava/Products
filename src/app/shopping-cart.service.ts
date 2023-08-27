import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Product } from './product';
import { take } from 'rxjs';
import { ShoppingCart } from './shopping-cart';
import { ShoppingCartItem } from './shopping-cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  cartItem: any;
  itemsCart: any;
  shop!: ShoppingCartItem;
  constructor() {}

  createProduct(): Promise<any> {
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    const newPostKey = push(ref(db)).key;
    console.log('cartdb', newPostKey);
    return new Promise((resolve, reject) => {
      update(ref(db, 'shopping-cart/' + newPostKey), {
        dateCreated: new Date().getTime(),
      });
      resolve(newPostKey);
    });
  }

  async getCart(): Promise<any> {
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    let id = await this.getOrCreatecartId();
    return new Promise((resolve, reject) => {
      onValue(ref(db, '/shopping-cart/' + id + '/items/'), (snapshot) => {
        console.log('On value in get Cart is called');
        console.log('snapsho child data', snapshot.val());
        // let getItemsList = [];
        // for (let key in snapshot.val()) {
        //   this.shop = {};
        //   Object.assign(this.shop, snapshot.val()[key]);
        //   getItemsList.push(this.shop);
        // }
        // console.log('After assigning items to object', getItemsList);
        return resolve(snapshot.val());
      });
    });
  }

  async getOrCreatecartId(): Promise<string> {
    console.log('getOrCreatecartId');
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.createProduct();
    localStorage.setItem('cartId', result);
    return result;
  }

  async addtoCart(product: Product): Promise<any> {
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    console.log('addtoCart');
    console.log('product', product);
    let cartid = await this.getOrCreatecartId();
    let itemsCart = new Promise((resolve, reject) => {
      onValue(ref(db, '/shopping-cart/' + cartid), (snapshot) => {
        console.log('items', snapshot.val());
        console.log(snapshot.val());
        console.log('items db', snapshot.val(), product.key);
        return resolve(snapshot.val());
      });
    });
    return itemsCart.then((data: any) => {
      console.log('this.itemsCart', data);

      if (!data.items || !(product.key && data?.items[product.key])) {
        data.items = product.key && { [product.key]: { product, quantity: 1 } };
        update(ref(db, '/shopping-cart/' + cartid + '/items/' + product.key), {
          product: product,
          quantity: 1,
        });
        return data;
      } else {
        console.log('this.itemsCart', data?.items[product.key]);
        data.items[product.key].quantity =
          data?.items[product.key].quantity + 1;
        update(ref(db, '/shopping-cart/' + cartid + '/items/' + product.key), {
          quantity: data.items[product.key].quantity,
        });
        return data;
      }
    });
  }

  async deleteFromCart(product: any) {
    console.log('inside cartservice delete method', product);
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    let cartid = await this.getOrCreatecartId();
    let itemsCart = new Promise((resolve, reject) => {
      onValue(ref(db, '/shopping-cart/' + cartid), (snapshot) => {
        console.log('items', snapshot.val());
        console.log(snapshot.val());
        console.log('items db', snapshot.val(), product.key);
        return resolve(snapshot.val());
      });
    });
    return itemsCart.then((data: any) => {
      console.log('this.itemsCart', data);

      if (data.items || (product.key && data?.items[product.key])) {
        console.log('this.deleteItemscart', data?.items[product.key]);
        data.items[product.key].quantity =
          data?.items[product.key].quantity - 1;
        if (data.items[product.key].quantity === 0) {
          remove(ref(db, '/shopping-cart/' + cartid + '/items/' + product.key));
        } else {
          update(
            ref(db, '/shopping-cart/' + cartid + '/items/' + product.key),
            {
              quantity: data.items[product.key].quantity,
            }
          );
        }
        return data;
      }
    });
  }

  async clearCartItems() {
    console.log('clear acrt service');
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    let cartid = await this.getOrCreatecartId();
    let itemsCart = new Promise((resolve, reject) => {
      onValue(ref(db, '/shopping-cart/' + cartid), (snapshot) => {
        console.log('items', snapshot.val());
        console.log(snapshot.val());
        console.log('items db', snapshot.val());
        return resolve(snapshot.val());
      });
    });
    itemsCart.then((data: any) => {
      if (!data) return;
      console.log('remove method data', data);
      console.log('this.itemsCart', data);
      remove(ref(db, '/shopping-cart/' + cartid + '/items/'));
    });
    localStorage.removeItem('cartId');
  }
}
