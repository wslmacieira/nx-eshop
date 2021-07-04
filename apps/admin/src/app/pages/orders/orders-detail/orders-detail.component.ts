import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrdersService } from '@dwll/orders';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: []
})
export class OrdersDetailComponent implements OnInit {
  order!: Order;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._getOrder();
  }

  private _getOrder() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.ordersService.getOrder(params.id).subscribe((order) => (this.order = order));
      }
    })
  }
}
