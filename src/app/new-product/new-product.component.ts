import { Component } from '@angular/core';
import { ProductListService } from '../product-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent {
  categories: any[] = [];
  id;
  product: Product = {};
  constructor(
    private productService: ProductListService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    this.productService.getCategories().then((data) => {
      this.categories = Object.keys(data);
      console.log(data);
      return this.categories;
    });

    if (this.id) {
      this.productService.getProductdetails(this.id).then((data) => {
        console.log('product', data);
        this.product.title = data.title;
        this.product.category = data.category;
        this.product.imageUrl = data.imageUrl;
        this.product.price = data.price;
      });
    }
  }

  saveProduct(f: any) {
    console.log('form submitted', f);
    if (!this.id) {
      this.productService.createProduct(f);
    } else {
      this.productService.updateProduct(this.id, f);
    }
    this.router.navigate(['/products']);
  }

  deleteProduct() {
    if (!confirm('Do you want to delete this product?')) return;

    this.productService.deleteProduct(this.id);
    this.router.navigate(['/products']);
  }
}
