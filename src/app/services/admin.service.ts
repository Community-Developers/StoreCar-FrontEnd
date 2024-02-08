import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Car } from '../shared/navbar/car.interface';
import { Moto } from '../shared/navbar/moto.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) { }


  fetchData(): HttpHeaders {
    // Recupera o token de autenticação do localStorage
    const authToken = localStorage.getItem('access_token');

    // Cria um objeto HttpHeaders e adiciona o token ao cabeçalho 'Authorization'
    return new HttpHeaders({

      'Authorization': `Bearer ${authToken}`
    });

  }




  //requisições para automoveis

  public getAllCars(): Observable<Car[]> {

    //const headers: HttpHeaders = this.fetchData();
    return this.http.get<{ content: Car[] }>('http://18.220.168.177/veiculo').pipe(
      map(res => res.content)
    );
  }

  getItem(type: string, id: any): Observable<any> {
    return this.http.get(`http://18.220.168.177/${type}/${id}`);
  }

  public deleteItem(idItem: number, type: string): Observable<any> {
    const headers = this.fetchData();
    return this.http.delete(`http://18.220.168.177/${type}/${idItem}`, { headers });
  }


  post(formData: FormData) {
    const headers = this.fetchData();
    return this.http.post('http://18.220.168.177/veiculo', formData, { headers })
  }



  public postCar(): Observable<any> {
    return this.http.get('http://18.220.168.177/admin/cars');
  }

  public updateCar(): Observable<any> {
    return this.http.get('http://18.220.168.177/admin/cars');
  }

  public editCar(): Observable<any> {
    return this.http.get('http://18.220.168.177/admin/cars');
  }

  public destacarCar(): Observable<any> {
    return this.http.get('http://18.220.168.177/admin/cars');
  }




  //requisições para motocicletas

  public getAllMobi(): Observable<Moto[]> {
    return this.http.get<{ content: Moto[] }>('http://18.220.168.177/motocicleta').pipe(
      map(res => res.content)
    );
  }

  public postMobi(): Observable<any> {
    return this.http.get('http://18.220.168.177/admin/cars');
  }

  public updateMobi(): Observable<any> {
    return this.http.get('http://18.220.168.177/admin/cars');
  }

  public editMobi(): Observable<any> {
    return this.http.get('http://18.220.168.177/admin/cars');
  }

  public destacarMobi(): Observable<any> {
    return this.http.get('http://18.220.168.177/admin/cars');
  }





}
