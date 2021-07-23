import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: []
})
export class CartPageComponent implements OnInit {
  quantity = 0;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem() {
    console.log('delete cart item!');

  }
}
