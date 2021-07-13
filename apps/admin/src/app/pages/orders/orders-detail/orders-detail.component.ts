import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrdersService } from '@dwll/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

type OrderStatus = {
  id: string;
  name: string;
};

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: []
})
export class OrdersDetailComponent implements OnInit {
  order!: Order;
  orderStatuses: OrderStatus[] = [];
  selectedStatus!: number;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.mapOrderStatus();
    this._getOrder();
  }

  mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.ordersService.getOrder(params.id).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status ?? 0;
        });
      }
    });
  }

  onStatusChange(event: any, orderId: any) {
    this.ordersService.updateOrder({ status: event.value }, orderId).subscribe(
      (order) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order is updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
      }
    );
  }
}
