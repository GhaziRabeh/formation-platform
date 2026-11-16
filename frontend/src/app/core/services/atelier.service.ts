
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Atelier } from 'types/atelier.interface';

interface ApiResponse<T> {
  data: T;
}

interface DeleteResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  private readonly apiUrl = `${environment.apiUrl}/ateliers`;

  constructor(private http: HttpClient) {}

  // GET /api/ateliers
  getAll(): Observable<Atelier[]> {
    return this.http
      .get<ApiResponse<Atelier[]>>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

  // POST /api/ateliers
  create(data: FormData): Observable<Atelier> {
    return this.http
      .post<ApiResponse<Atelier>>(this.apiUrl, data)
      .pipe(
        map(response => response.data)
      );
  }

  // DELETE /api/ateliers/{id}
  delete(id: number): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(
      `${this.apiUrl}/${id}`
    );
  }
}
