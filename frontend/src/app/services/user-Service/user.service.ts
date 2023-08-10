import { Injectable } from '@angular/core';
import { User } from '../../components/models/user.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';


export interface UserData {
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
export class UserService {

  constructor(private http: HttpClient) { }

  findOne(id: number): Observable<User> {
    return this.http.get('/api/users/' + id ).pipe(
      map((user : Object) => user as User)
    )
  }

  findAll(page: number, size: number): Observable<UserData>{
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    
    return this.http.get('/api/users', {params}).pipe(
      map((userData: Object) => userData as UserData),
      catchError(err => throwError(err))
    )
  }
}
