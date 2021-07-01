import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@dwll/products';

@Component({
  selector: 'dwll-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`)
  }

  deleteProduct(productId: string) {}

  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }

}
