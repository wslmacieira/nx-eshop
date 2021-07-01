import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const api_url = `${environment.apiURL}users`;
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(api_url);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${api_url}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(api_url, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${api_url}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<Object> {
    return this.http.delete<Object>(`${api_url}/${userId}`);
  }
}
