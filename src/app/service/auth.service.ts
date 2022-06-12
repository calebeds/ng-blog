import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(name: string, password: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${environment.apiUrl}/user/login`,
     {
      name,
      password
    });
  }
}
