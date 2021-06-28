import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/category.model';

const api_url = 'http://localhost:3000/api/v1/categories'
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(api_url);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(api_url, category);
  }

  deleteCategory(categoryId: string): Observable<Object> {
    return this.http.delete<Object>(`${api_url}/${categoryId}`)
  }
}
