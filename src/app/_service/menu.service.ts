import { Subject } from 'rxjs';
import { Menu } from './../_model/menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuCambio = new Subject<Menu[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}`;
  //url: string = `${environment.HOST}/${environment.MICRO_CR}`;

  constructor(private http: HttpClient) { }

  listar(){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return this.http.get<Menu[]>(`${this.url}/menus`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorUsuario(nombre: string){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return this.http.post<Menu[]>(`${this.url}/menus/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  leerporid(idMenu: number) {
    return this.http.get<Menu>(`${this.url}/menus/leerporid/${idMenu}`);
  }

  registrar(menu: Menu) {
    return this.http.post(`${this.url}/menus/registrar`, menu);
  }

  modificar(menu: Menu) {
    return this.http.put(`${this.url}/menus/modificar`, menu);
  }

  eliminar(idMenu: number) {
    return this.http.delete(`${this.url}/${idMenu}`);
  }

}
