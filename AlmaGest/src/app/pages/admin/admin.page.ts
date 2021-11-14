import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, IonList, ModalController } from "@ionic/angular";
import { DataService } from "src/app/services/data.service";
import { EditarPage } from '../editar/editar.page';

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"],
})
export class AdminPage implements OnInit {

  @ViewChild('lista', {static: true}) lista: IonList;
  usuarios: any[] = [];

  constructor(public router: Router, private dataService: DataService, private modalCtrl: ModalController, public alertCtrl: AlertController, public changer: ChangeDetectorRef) {
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

  async abrirEditar(usuario) {
    const modal = await this.modalCtrl.create({
      component: EditarPage,
      componentProps:{
        usuario: usuario
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);    
    this.dataService.editar(data.usuario);
    this.lista.closeSlidingItems();
  }

  async eliminar(usuario) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'Borrar usuario',
      message: '¿Esta seguro de querer borrar el usuario?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          this.lista.closeSlidingItems();
        }
      },{
        text: 'Si',
        handler: () => {
          this.dataService.eliminar(usuario);
          this.recargar();
          console.log("eliminar", usuario);
        }
      }]
    });
    await alert.present();
  }

  recargar(){
    this.ngOnInit();
    this.router.navigateByUrl('/tabs/admin')
    console.log('recarga');
  }
}
