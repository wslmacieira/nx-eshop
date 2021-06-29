import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/category.model';
import { environment } from '@env/environment';

const api_url = `${environment.apiURL}categories`
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(api_url);
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
