import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@dwll/orders';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => this.orders = orders)
  }

  deleteOrder(orderId: string) {}
  showOrder(orderId: string) {}

}
