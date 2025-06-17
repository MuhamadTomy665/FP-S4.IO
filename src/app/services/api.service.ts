import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Ganti sesuai URL backend Laravel kamu

  constructor(private http: HttpClient) {}

  // POST umum (tanpa token)
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${endpoint}`, data);
  }

  // POST dengan Bearer Token
  postWithAuth(endpoint: string, data: any): Observable<any> {
    const token = localStorage.getItem('auth_token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}${endpoint}`, data, { headers });
  }

  // Endpoint untuk ambil antrian (dengan auth)
  ambilAntrian(data: any): Observable<any> {
    return this.postWithAuth('/antrian', data); // ✅ sudah pakai token
  }

  // Endpoint untuk register pasien
  register(data: any): Observable<any> {
    return this.post('/register', data);
  }

  // Endpoint untuk login
  login(data: any): Observable<any> {
    return this.post('/login', data);
  }

  // GET tanpa auth
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${endpoint}`);
  }

  // GET dengan Bearer Token
  getWithAuth(endpoint: string): Observable<any> {
    const token = localStorage.getItem('auth_token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}${endpoint}`, { headers });
  }
}
