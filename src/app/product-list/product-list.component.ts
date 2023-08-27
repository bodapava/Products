import { Component } from '@angular/core';
import { ProductListService } from '../product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: any[] = [];
  filterProducts: any[] = [];
  categories: any[] = [];

  constructor(private productService: ProductListService) {
    productService.getAllProducts().then((data) => {
      this.filterProducts = this.products = Object.entries(data);
      console.log(this.products);
      return this.products;
    });

    productService.getCategories().then((data) => {
      this.categories = data;
      return this.categories;
    });
  }

  filteredProducts(typed: string) {
    console.log(typed);
    this.filterProducts = typed
      ? this.products.filter((p) =>
          p[1].title.toLowerCase().includes(typed.toLowerCase())
        )
      : this.products;
  }
}
