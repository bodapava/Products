import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ProductListService } from '../product-list.service';
import { Product } from '../product';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../shopping-cart';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css'],
})
export class ProductCatalogComponent implements OnInit {
  //catalog: any[] = [];
  catalogCateg: any[] = [];
  category!: any;
  filteredCatg: Product[] = [];
  cart: any;
  product!: Product;
  productCatalog: any[] = [];

  constructor(
    private productService: ProductListService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    console.log('Constructor is called!');
    this.productService.getAllProducts().then((data) => {
      console.log('catalog', data);
      for (let key in data) {
        this.product = {};
        Object.assign(this.product, data[key]);
        this.product.key = key;
        this.productCatalog.push(this.product);
      }
      console.log('assigned object', this.product);
      console.log('assigned object list ', this.productCatalog);
      // this.catalog = Object.entries(data);

      //Add this after the producst are initialised so that after you refresh the page you don't see an empty page
      this.route.queryParamMap.subscribe((params) => {
        this.category = params.get('category');
        console.log(this.category);
        this.filteredCatg = this.category
          ? this.productCatalog.filter(
              (product) =>
                product.category.toLowerCase() === this.category.toLowerCase()
            )
          : this.productCatalog;
        return this.category, this.filteredCatg;
      });
      return this.productCatalog;
    });

    this.productService.getCategories().then((data) => {
      this.catalogCateg = Object.entries(data);
      console.log('data', data);
      return this.catalogCateg;
    });
    console.log('NgOnit has been called!');

    this.cartService.getCart().then((result) => {
      console.log('Cart Service is Called!');
      this.cart = result;
      console.log('get cart data in catalog', result);
      console.log('get items in catalog', this.cart);
      //return this.cart;
    });
  }

  ngOnInit() {}
}
