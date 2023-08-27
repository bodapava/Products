import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  update,
} from 'firebase/database';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  constructor() {}

  getAllProducts(): Promise<any> {
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    return new Promise((resolve, reject) => {
      onValue(ref(db, '/products'), (snapshot) => {
        const productsList = snapshot.val();
        return resolve(productsList);
      });
    });
  }

  getCategories(): Promise<any> {
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    return new Promise((resolve, reject) => {
      onValue(ref(db, '/categories'), (snapshot) => {
        const catList = snapshot.val();
        return resolve(catList);
      });
    });
  }

  getProductdetails(id: any): Promise<Product> {
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    return new Promise((resolve, reject) => {
      onValue(ref(db, '/products/' + id), (snapshot) => {
        const product = snapshot.val();
        return resolve(product);
      });
    });
  }

  createProduct(p: Product) {
    console.log('service', p);
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    const newPostKey = push(ref(db)).key;
    return update(ref(db, 'products/' + newPostKey), p);
  }

  deleteProduct(id: any) {
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    remove(ref(db, '/products/' + id));
  }

  updateProduct(id: any, p: Product) {
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    update(ref(db, '/products/' + id), p);
  }
}
