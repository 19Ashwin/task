import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUri:string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }

  addProduct(data: any): Observable<any> {
    let url = `${this.baseUri}/products`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  getProduct() {
    return this.http.get(`${this.baseUri}/products`);
  }
  // getRoleById(role_id: any): Observable<any> {
  //   let url = `${this.baseUri}/products/${role_id}`;
  //   return this.http.get(url, {headers: this.headers}).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }
  // updateRole(role_id: any, data: any): Observable<any> {
  //   let url = `${this.baseUri}/products/${role_id}`;
  //   return this.http
  //     .put(url, data, {
  //       headers: {
  //         // "Content-Type": "application/json",
  //         // "X-auth-header": JSON.parse(
  //         //   window.localStorage.getItem("currentUser")
  //         // ),
  //       },
  //     })
  //     .pipe(catchError(this.errorMgmt));
  // }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}