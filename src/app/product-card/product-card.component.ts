import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../shopping-cart';
import { ShoppingCartItem } from '../shopping-cart-item';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: any;
  @Input() shoppingcart!: ShoppingCartItem;
  cartId!: string;
  productQuantity!: number;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {
    this.getQuantity();
  }
  async addtoCart(product: any) {
    console.log('Add to Cart');
    console.log('product', product);
    const data = await this.cartService.addtoCart(product);
    console.log('add to cart', data);
    console.log('this.shopping cart', this.shoppingcart);
    this.getQuantity(data);
  }
  getQuantity(data?: any) {
    if (!this.shoppingcart || !this.shoppingcart.product)
      this.productQuantity = 0;
    const cartItems = data?.items || this.shoppingcart;
    if (!cartItems) return;
    let item = cartItems[this.product.key];
    this.productQuantity = item.quantity;
  }

  async removeFrmCart(product: any) {
    const data = await this.cartService.deleteFromCart(product);
    this.getQuantity(data);
  }
}
