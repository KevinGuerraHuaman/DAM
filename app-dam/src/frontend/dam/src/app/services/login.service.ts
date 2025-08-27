import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8000'; 

  constructor(private _http: HttpClient, private _router: Router) { }

  async login(username: string, password: string) {
    try {
      let response = await firstValueFrom(this._http.post<any>(
        `${this.apiUrl}/login`,  // 👈 solo un /login
        { username, password }
      ));
      
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        this._router.navigate(['/home']);
      } else {
        throw new Error('Token no recibido');
      }
    } catch (error) {
      console.error('Error en login service:', error);
      throw error;  // Re-lanza el error para que lo maneje el componente
    }
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}