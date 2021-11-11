import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonList } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  @ViewChild('lista', {static: true}) lista: IonList;
  usuarios: any[] = [];

  constructor(public router: Router, private dataService: DataService) {
    if (router.getCurrentNavigation().extras.state) {
      const token = this.router.getCurrentNavigation().extras.state;
    }
  }

  ngOnInit() {
    this.dataService.getUsuarios().then((data) => {
      this.usuarios = data.data;
      console.log(this.usuarios);
    })
  }

  activar(usuario) {
    this.dataService.activar(usuario);
    console.log("activar", usuario);
    this.lista.closeSlidingItems();
  }

  desactivar(usuario) {
    console.log("desactivar", usuario);
    this.lista.closeSlidingItems();
  }

  editar(usuario) {
    console.log("editar", usuario);
    this.lista.closeSlidingItems();
  }

  eliminar(usuario) {
    console.log("eliminar", usuario);
  }

}
