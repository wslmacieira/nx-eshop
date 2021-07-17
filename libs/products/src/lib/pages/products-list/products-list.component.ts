import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  checked!: boolean;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this._getProducts();
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productsService.getProducts(categoriesFilter).subscribe((resProducts) => (this.products = resProducts));
  }
  private _getCategories(): void {
    this.categoriesService
      .getCategories()
      .subscribe((resCategories) => (this.categories = resCategories));
  }

  categoryFilter() {
    const selectedCategories = this.categories.filter(category => category.checked)
    .map((category) => category.id) as string[];
    console.log(selectedCategories)

    this._getProducts(selectedCategories);
  }
}
