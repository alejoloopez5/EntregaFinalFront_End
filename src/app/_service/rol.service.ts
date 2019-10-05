import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Rol } from '../_model/rol';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rolCambio = new Subject<Rol[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/roles`;
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Rol[]>(this.url);
  }

  leerid(idRol: number) {
    return this.http.get<Rol>(`${this.url}/${idRol}`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  registrar(rol: Rol) {
    return this.http.post(this.url, rol);
  }

  modificar(rol: Rol) {
    return this.http.put(this.url, rol);
  }

  eliminar(idRol: number) {
    return this.http.delete(`${this.url}/${idRol}`);
  }
}
