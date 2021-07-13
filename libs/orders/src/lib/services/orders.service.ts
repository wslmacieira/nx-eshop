import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../models/order.model';
import { environment } from '@env/environment';

const api_url = `${environment.apiURL}orders`
@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(api_url);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${api_url}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(api_url, order);
  }

  updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${api_url}/${orderId}`, orderStatus);
  }

  deleteOrder(orderId: string): Observable<Object> {
    return this.http.delete<Object>(`${api_url}/${orderId}`)
  }
}
