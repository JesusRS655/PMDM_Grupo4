import { Component, OnInit } from '@angular/core';
import { PedirPage } from '../pedir/pedir.page';
import { DataService } from '../../services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
  ) { }

  empresas: any[] = [];

  ngOnInit() {
  }

  async pedir() {
    const modal = await this.modalCtrl.create({
      component: PedirPage,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.dataService.getEmpresas().then((data) => {
      if ((data !== undefined)) {
        this.empresas = data.data;
      }
    });
  }

}
