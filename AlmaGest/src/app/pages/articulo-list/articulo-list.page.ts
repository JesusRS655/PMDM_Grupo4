import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AddArticuloPage } from '../add-articulo/add-articulo.page';

@Component({
  selector: 'app-articulo-list',
  templateUrl: './articulo-list.page.html',
  styleUrls: ['./articulo-list.page.scss'],
})
export class ArticuloListPage implements OnInit {
  articulos: any[] = [];

  constructor(private dataService: DataService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.dataService.getArticulos().then((data) => {
      this.articulos = data.data;
      this.articulos = this.ordenarArticulos();
      console.log(this.articulos);
    });
  }

  ordenarArticulos() {
    return this.articulos.sort((a, b) => {
      if (a.description > b.description) {
        return 1;
      }
      if (a.description < b.description) {
        return -1;
      }
      return 0;
    });
  }

  async abrirAddArticulo(){
    const modal = await this.modalCtrl.create({
      component: AddArticuloPage,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);    
  }

}
