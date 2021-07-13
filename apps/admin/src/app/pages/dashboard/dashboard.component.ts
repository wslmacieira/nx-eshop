import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@dwll/orders';
import { ProductsService } from '@dwll/products';
import { UsersService } from '@dwll/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userCount!: number;
  productCount!: number;
  orderCount!: number;
  totalSales!: number;

  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.usersService.getUsersCount().subscribe((userCount) => {
      this.userCount = +Object.values(userCount);
    });
    this.productsService.getProductsCount().subscribe((productCount) => {
      this.productCount = +Object.values(productCount);
    });
    this.ordersService.getOrdersCount().subscribe((orderCount) => {
      this.orderCount = +Object.values(orderCount);
    });
    this.ordersService.getTotalSales().subscribe((totalSales) => {
      this.totalSales = +Object.values(totalSales);
    });
  }
}
