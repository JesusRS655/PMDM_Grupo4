import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { EditarPage } from '../editar/editar.page';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  @ViewChild('lista', {static: true}) 
  lista: IonList;
  usuarios: any[] = [];

  constructor(
    public router: Router, 
    private dataService: DataService,
    private modalCtrl: ModalController, 
    private alertCtrl: AlertController,
    public changer: ChangeDetectorRef
    ) {
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
    this.router.navigateByUrl('/tabs/user-list')
    console.log('recarga');
  }

  refrescar(event) {
    setTimeout(() => {
      this.recargar();
      event.target.complete();
    }, 1500);
  }
}
