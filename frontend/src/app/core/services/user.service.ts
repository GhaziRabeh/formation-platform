
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User, UserRole } from 'types/user.interface';

interface ApiResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // GET /api/users?role=... (Admin)
  getAll(role?: UserRole): Observable<User[]> {
    const params = role
      ? new HttpParams().set('role', role)
      : undefined;

    return this.http
      .get<ApiResponse<User[]>>(this.apiUrl, { params })
      .pipe(
        map(response => response.data)
      );
  }
}
