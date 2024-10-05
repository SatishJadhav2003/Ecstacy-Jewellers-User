import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { apiUrl, appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  // Base URL for the API
  private baseUrl = apiUrl;

  // Define common headers
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.getToken()}` ,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Origin': '*'
  });

  // Function to retrieve token (for example, from localStorage)
  private getToken(): string | null {
    return localStorage.getItem('authToken');  // Adjust according to your token storage mechanism
  }

  constructor(private http: HttpClient) { }

  // GET Request
  get<T>(endpoint: string, params?: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url, { headers: this.headers, params });
  }

  // POST Request
  post(endpoint: string, body: any): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post( url, body, requestOptions)
      .pipe(
        map((resp: any) => resp),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
           console.log(error);
           
          }
          return throwError(error || 'Server error');
        })
      );
  }

  // PUT Request
  put<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.put<T>(url, body, { headers: this.headers });
  }

  // DELETE Request
  delete<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete<T>(url, { headers: this.headers });
  }
}
