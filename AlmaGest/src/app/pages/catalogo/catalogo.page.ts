import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { ArticulosPage } from '../articulos/articulos.page';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  constructor(
    public router: Router,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  @ViewChild('lista', {static: true}) 
  lista: IonList;

  articulos: any[] = [];
  productos: any[] = [];

  max_productos: number = 75;

  ngOnInit() {
    this.dataService.getProductosEmpresa().then((data) => {
      this.productos = data.data;
    });
  }

  async abrirArticulos() {
    const modal = await this.modalCtrl.create({
      component: ArticulosPage,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.dataService.getArticulos().then((data) => {
      if ((data !== undefined)) {
        this.articulos = data.data;
        console.log(data.data);
      }
    });
  }

  async eliminarProducto(id){
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'Borrar producto',
      message: '¿Esta seguro de querer borrar el producto?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          this.lista.closeSlidingItems();
        }
      },{
        text: 'Si',
        handler: () => {
          this.dataService.eliminarProducto(id);
          this.recargar();
          console.log("eliminar", id);
        }
      }]
    });
    await alert.present();
  }

  async presentAlert(){
    const alert = await this.alertCtrl.create({
      header: "Alerta",
      message:
        "Ha llegado al límite de productos. Si quiere añadir más, elimine alguno antes",
      buttons: [
        {
          text: "OK",
          cssClass: "secondary",
          role: "cancel",
        },
      ],
    });
    await alert.present();
  }

  recargar(){
    this.ngOnInit();
    this.router.navigateByUrl('/catalogo')
    console.log('recarga');
  }
}
