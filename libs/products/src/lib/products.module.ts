import { OrdersModule } from './../../../orders/src/lib/orders.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';

@NgModule({
  imports: [CommonModule, OrdersModule, RouterModule],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent
  ],
  exports: [ProductsSearchComponent, CategoriesBannerComponent]
})
export class ProductsModule {}
