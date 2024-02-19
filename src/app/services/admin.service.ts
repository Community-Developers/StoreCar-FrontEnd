import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Car } from '../shared/navbar/car.interface';
import { Moto } from '../shared/navbar/moto.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  mobiDestaques: any[] = [];
  carrosDestaques: any[] = [];




  constructor(private http: HttpClient) { }


  fetchData(): HttpHeaders {
    // Recupera o token de autenticação do localStorage
    const authToken = localStorage.getItem('access_token');

    // Cria um objeto HttpHeaders e adiciona o token ao cabeçalho 'Authorization'
    return new HttpHeaders({

      'Authorization': `Bearer ${authToken}`
    });

  }


  //=========== GET ALL SERVER ================
  public getAllCars(): Observable<Car[]> {

    //const headers: HttpHeaders = this.fetchData();
    return this.http.get<{ content: Car[] }>('https://server.brasilmobis.com/veiculo').pipe(
      map(res => res.content)
    );
  }
  public getAllMobi(): Observable<Moto[]> {
    return this.http.get<{ content: Moto[] }>('https://server.brasilmobis.com/motocicleta').pipe(
      map(res => res.content)
    );
  }
  //=========== GET ALL SERVER ================



  //=========== GET ALL DESTAQUES ================


  // public getDestaquesCar() {
  //   this.http.get<Car[]>('http://18.220.168.177/veiculo/destaques').subscribe({
  //     next: (cars) => {
  //       this.carrosDestaques = cars.map(car => ({
  //         id: car.id,
  //         titulo: car.titulo,
  //         type: 'veiculo',
  //         km: car.km,
  //         combustivel: car.combustivel,
  //         potenciaMotor: car.potenciaMotor,
  //         valor: car.valor,
  //         imagem: car.imagensVeiculos[0]?.imageUrl
  //       }));
  //       console.log(this.carrosDestaques.length + " carros em destaque carregados.");
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   });
  // }

  public getDestaquesCarros() {
    return this.http.get<{ content: Car[] }>('https://server.brasilmobis.com/veiculo').pipe(
      map(res => res.content)
    );
  }


  getStar() {
    return this.carrosDestaques;
  }

  public getDestaquesMobi(): Observable<Moto[]> {
    return this.http.get<{ content: Moto[] }>('https://server.brasilmobis.com/destaques').pipe(
      map(res => res.content)
    );
  }

  //=========== GET ALL DESTAQUES SERVER ================




  //===========POST SERVER ================
  post(formData: FormData) {
    const headers = this.fetchData();
    return this.http.post('https://server.brasilmobis.com/veiculo', formData, { headers })
  }

  postMoto(formData: FormData) {
    const headers = this.fetchData();
    return this.http.post('https://server.brasilmobis.com/motocicleta', formData, { headers })
  }
  //===========POST SERVER ================





  //=========== GET ITEM SERVER ================
  getItem(type: string, id: any): Observable<any> {
    return this.http.get(`https://server.brasilmobis.com/${type}/${id}`);
  }
  //=========== GET ITEM SERVER ================




  //=========== DELETE IMAGE SERVER ================
  public deleteImageCarro(id: string, nameObject: string): Observable<any> {
    const headers = this.fetchData();
    return this.http.delete(`https://server.brasilmobis.com/veiculo/delete-images/${id}/${nameObject}`, { headers });
  }

  public deleteImageMoto(id: string, nameObject: string): Observable<any> {
    const headers = this.fetchData();
    return this.http.delete(`https://server.brasilmobis.com/motocicleta/delete-images/${id}/${nameObject}`, { headers });
  }
  //=========== DELETE IMAGE SERVER ================



  //================= UPDATE SERVER ============================
  public updateMobi(id: any, value: any): Observable<any> {
    return this.http.put(`https://server.brasilmobis.com/motocicleta/${id}`, value, { headers: this.fetchData() });
  }

  public updateCarro(id: number, value: any): Observable<any> {
    return this.http.put(`https://server.brasilmobis.com/veiculo/${id}`, value, { headers: this.fetchData() });
  }
  //================= UPDATE SERVER ============================



  //================= DELETE ITEM SERVER ============================

  public deleteItem(idItem: number, type: string): Observable<any> {
    const headers = this.fetchData();
    return this.http.delete(`https://server.brasilmobis.com/${type}/${idItem}`, { headers });
  }
  //================= DELETE ITEM SERVER ============================




  //================= SAVE NEW IMAGES ============================
  saveNewImages(formData: FormData, type: string, id: string,): Observable<any> {
    return this.http.post(`https://server.brasilmobis.com/${type}/save-images/${id}`, formData, { headers: this.fetchData() });
  }
  //================= SAVE NEW IMAGES ============================

}
