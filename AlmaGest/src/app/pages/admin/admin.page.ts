import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { IonList } from "@ionic/angular";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"],
})
export class AdminPage implements OnInit {

  @ViewChild('lista', {static: true}) lista: IonList;
  usuarios: any[] = [];

  constructor(public router: Router, private dataService: DataService) {
    if (router.getCurrentNavigation().extras.state) {
      const token = this.router.getCurrentNavigation().extras.state;
      // console.log(token);
    }
  }

  ngOnInit() {
    this.dataService.getUsuarios().then((data) => {
      this.usuarios = data.data;
      console.log(this.usuarios);
    });
  }

  activar(usuario) {
    this.dataService.activar(usuario);
    console.log("activar", usuario);
    this.recargar();
    this.lista.closeSlidingItems();
  }

  desactivar(usuario) {
    this.dataService.desactivar(usuario);
    console.log("desactivar", usuario);
    this.recargar();
    this.lista.closeSlidingItems();
  }

  editar(usuario) {
    console.log("editar", usuario);
    this.lista.closeSlidingItems();
  }

  eliminar(usuario) {
    this.dataService.eliminar(usuario);
    this.recargar();
    console.log("eliminar", usuario);
  }

  recargar(){
    
  }
}
