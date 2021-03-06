import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Product } from '../models/product.model';

const api_url = `${environment.apiURL}products`;
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Product[]>(api_url, { params });
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

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${api_url}/${productId}`);
  }
  getProductsCount(): Observable<number> {
    return this.http.get<number>(`${api_url}/get/count`);
  }
  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${api_url}/get/featured/${count}`);
  }
}
