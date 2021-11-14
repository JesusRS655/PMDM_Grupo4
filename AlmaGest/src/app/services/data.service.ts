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
          console.log(data);
          resolve(data);
          console.log(this.token);
        });
    }).then(() => {
      this.redirect(this.tipo)
    });
  }

  register(usuario) {
    return this.http.post(this.apiUrl+'/register', usuario).subscribe((data) => {
      console.log(data);
    });
  }

  redirect(tipo: String) {
    if (tipo === "a") {
      this.router.navigateByUrl('/tabs')
    } else {
      this.router.navigateByUrl('/usuario')
    }
  }

  getUsuarios() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json",
      }),
    };
  
    return new Promise<any>((resolve) => {
      this.http.get(this.apiUrl + "/users", httpOptions).subscribe((data) => {
        resolve(data);
        console.log(data);
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
      }),
    };
    return new Promise((resolve) => {
      this.http.post(this.apiUrl + "/activate", {
        user_id: usuario.id
      }, httpOptions).subscribe((data) => {
        // console.log(data);
        resolve(data);
      })
    })
  }

  desactivar(usuario){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.token,
        "Content-Type": "application/json",
      }),
    };
    return new Promise((resolve) => {
      this.http.post(this.apiUrl + "/deactivate", {
        user_id: usuario.id
      }, httpOptions).subscribe((data) => {
        // console.log(data);
        resolve(data);
      })
    })
  }

  eliminar(usuario) {
    let user_id = usuario.id
    console.log(user_id);    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.token,
        "Content-Type": "application/json",
      }),
    };
    return new Promise((resolve) => {
      this.http.post(this.apiUrl + '/user/deleted/' + user_id, { user_id: usuario.id
      }, httpOptions).subscribe((data) => { resolve(data); })
    })
  }

  editar(usuario){
    let user_id = usuario.id
    console.log(user_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.token,
        "Content-Type": "application/json",
      }),
    };
    return new Promise((resolve) => {
      this.http.post(this.apiUrl + "/user/updated/" + user_id, {
        user_id: usuario.id,
        firstname: usuario.firstname,
        secondname: usuario.secondname,
        email: usuario.email,
        password: usuario.password,
        company_id: usuario.company_id
      }, httpOptions).subscribe((data) => {
        console.log(data);
        resolve(data);
      })
    })
  }
}