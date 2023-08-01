import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

export interface ColisData {
  items: readonly any[],
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  }, 
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  }
}
@Injectable({
  providedIn: 'root'
})
export class ColisService {

  constructor(private http: HttpClient) { } 
  
  findAll(page: number, size: number): Observable<ColisData>{
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    
    return this.http.get('/api/colis', {params}).pipe(
      map((colisData: Object) => colisData as ColisData),
      catchError(err => throwError(err))
    )
  }
}
