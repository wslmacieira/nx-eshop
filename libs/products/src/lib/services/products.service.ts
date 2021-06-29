import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/category.model';
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

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${api_url}/${categoryId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(api_url, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${api_url}/${category.id}`, category);
  }

  deleteCategory(categoryId: string): Observable<Object> {
    return this.http.delete<Object>(`${api_url}/${categoryId}`)
  }
}
