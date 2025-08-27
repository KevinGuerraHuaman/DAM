import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  private url = `${environment.apiUrl}/dispositivos`; //  Asegúrate de puerto correcto (backend corre en 3000)

  constructor(private _http: HttpClient) {}

  // Listado de dispositivos
  getDispositivos(): Observable<any[]> {
    return this._http.get<any[]>(this.url);
  }

  // Detalle de un dispositivo
  getDispositivo(id: string): Observable<any> {
    return this._http.get<any>(`${this.url}/${id}`);
  }

  // Historial de un dispositivo
  getMediciones(id: string): Observable<any[]> {
    return this._http.get<any[]>(`${this.url}/${id}/mediciones`);
  }

  // Toggle válvula
  toggleValvula(id: string): Observable<any> {
    return this._http.post<any>(`${this.url}/${id}/valvula`, {});
  }
}
