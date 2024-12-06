import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { apiUrl, appConfig } from '../app.config';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {

  // Base URL for the API
  public baseUrl = apiUrl;

  // Define common headers
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.getToken()}`,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Origin': '*',
  });

  // Function to retrieve token (for example, from localStorage)
  private getToken(): string | null {
    return localStorage.getItem('authToken'); // Adjust according to your token storage mechanism
  }

  constructor(private http: HttpClient,private util:UtilService) {}

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
      .post(url, body, requestOptions)
      .pipe(catchError(this.handleError));
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

   // POST Request
   postImage(endpoint: string, body: any): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    

    return this.http
      .post(url, body)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.util.error(errorMessage); // UtilService should work here
    return throwError(errorMessage);
  }
}
