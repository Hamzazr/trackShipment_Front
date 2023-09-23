import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Colis, ColisPageable } from 'src/app/components/models/colis.interface';

export const JWT_NAME = 'JWT_SECRET';

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

  indexAll(page: number, size: number): Observable<ColisPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', String(size));

    return this.http.get<ColisPageable>('/api/colis', {params});
  }

  updateOne(colis : Colis):Observable<Colis>{
    return this.http.put('api/colis/'+ colis.id_colis, colis)
  }

  post(colis: Colis): Observable<Colis> {
    const token = localStorage.getItem(JWT_NAME);

    if (!token) {
      throw new Error('JWT token not found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Use the actual JWT token
    });
    
    return this.http.post<Colis>('/api/colis', colis, {headers});
  }

//-----------------------

  private jsonUrl = 'assets/country.json';
  private jsonUrl2 = 'assets/countryPhone.json';

  loadJsonData(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }

  loadJsonData2(): Observable<any> {
    return this.http.get(this.jsonUrl2);
  }

}
