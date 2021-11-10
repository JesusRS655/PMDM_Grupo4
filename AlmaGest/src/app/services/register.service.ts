import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl = 'http://semillero.allsites.es/public/api';

  constructor(private http : HttpClient) { }

  register(usuario) {
    return this.http.post(this.apiUrl+'/register', usuario).subscribe((data) => {
      console.log(data);
    });
  }
}
