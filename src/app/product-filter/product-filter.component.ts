import { Component, Input } from '@angular/core';
import { ProductListService } from '../product-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  catalogCateg: any[] = [];
  @Input('category') category: any;

  constructor(private productService: ProductListService) {
    this.productService.getCategories().then((data) => {
      this.catalogCateg = Object.entries(data);
      console.log('data', data);
      console.log('keys', this.catalogCateg);
      return this.catalogCateg;
    });
  }
}
