
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Inscription, InscriptionStatut } from 'types/inscription.interface';

interface ApiResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private readonly apiUrl = `${environment.apiUrl}/inscriptions`;

  constructor(private http: HttpClient) {}

  // GET /api/inscriptions (Admin)
  getAll(): Observable<Inscription[]> {
    return this.http
      .get<ApiResponse<Inscription[]>>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

  // GET /api/mes-inscriptions (Participant)
  getMine(): Observable<Inscription[]> {
    return this.http
      .get<ApiResponse<Inscription[]>>(`${environment.apiUrl}/mes-inscriptions`)
      .pipe(
        map(response => response.data)
      );
  }

  // POST /api/inscriptions (Participant)
  inscrire(atelierId: number): Observable<Inscription> {
    return this.http
      .post<ApiResponse<Inscription>>(this.apiUrl, { atelier_id: atelierId })
      .pipe(
        map(response => response.data)
      );
  }

  // PATCH /api/inscriptions/{id}/annuler (Participant)
  annuler(id: number): Observable<Inscription> {
    return this.http
      .patch<ApiResponse<Inscription>>(`${this.apiUrl}/${id}/annuler`, {})
      .pipe(
        map(response => response.data)
      );
  }

  // GET /api/ateliers/{id}/inscriptions (Admin ou formateur responsable)
  getByAtelier(atelierId: number): Observable<Inscription[]> {
    return this.http
      .get<ApiResponse<Inscription[]>>(`${environment.apiUrl}/ateliers/${atelierId}/inscriptions`)
      .pipe(
        map(response => response.data)
      );
  }

  // PATCH /api/inscriptions/{id}/statut
  updateStatus(id: number, statut: InscriptionStatut): Observable<Inscription> {
    return this.http
      .patch<ApiResponse<Inscription>>(`${this.apiUrl}/${id}/statut`, { statut })
      .pipe(
        map(response => response.data)
      );
  }
}
