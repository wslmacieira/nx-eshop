import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Product } from '../models/product.model';

const api_url = `${environment.apiURL}products`
@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(api_url);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${api_url}/${productId}`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(api_url, productData);
  }

  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`${api_url}/${productId}`, productData);
  }

  deleteCategory(categoryId: string): Observable<Object> {
    return this.http.delete<Object>(`${api_url}/${categoryId}`)
  }
}
