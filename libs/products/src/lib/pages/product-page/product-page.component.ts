import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@dwll/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product!: Product;
  quantity = 1;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.productId) {
        this._getProduct(params.productId);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    };
    this.cartService.setCartItem(cartItem);
  }

  private _getProduct(productId: string) {
    this.productsService
      .getProduct(productId)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => (this.product = resProduct));
  }
}
