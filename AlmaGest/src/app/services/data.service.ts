import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class DataService {
  token: any;
  tipo: String;
  apiUrl = "http://semillero.allsites.es/public/api";
  usuarios: [];

  constructor(private http: HttpClient, public nav: NavController, public router: Router) { }

  login(usuario) {
    return new Promise((resolve) => {
      this.http
        .post<any>(this.apiUrl + "/login", {
          email: usuario.email,
          password: usuario.password,
        })
        .subscribe((data) => {
          this.token = data.data.token;
          this.tipo = data.data.type;
          // console.log(data);
          resolve(data);
          // console.log(this.token);
        });
    }).then(() => {
      this.redirect(this.tipo)
    });
  }

  redirect(tipo: String) {
    if (tipo === "a") {
      // voy por aqui
      this.router.navigateByUrl('/admin')
    } else {
      this.router.navigateByUrl('/user')
    }
  }

  getUsuarios() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json",
        // 'withCredentials': 'true'
      }),
    };
  
    return new Promise<any>((resolve) => {
      this.http.get(this.apiUrl + "/users", httpOptions).subscribe((data) => {
        resolve(data);
        // console.log(data);
        (err) => {
          console.log(err);
        };
      });
    });
  }

  activar(usuario){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.token,
        "Content-Type": "application/json",
        // 'withCredentials': 'true'
      }),
    };
    return new Promise((resolve) => {
      this.http.post(this.apiUrl + "/activate", {
        id: usuario.id
      }, httpOptions).subscribe((data) => {
        console.log(data);
        resolve(data);
      })
    })
  }
}
