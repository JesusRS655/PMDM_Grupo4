import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.page.html',
  styleUrls: ['./pedir.page.scss'],
})
export class PedirPage implements OnInit {

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
  ) { }

  articulos: any[] = [];
  empresas: any[] = [];

  isDisabled = true;
  texto = "";

  ngOnInit() {
    this.dataService.getEmpresas().then((data) => {
      this.empresas = data.data;
    })
    this.dataService.getArticulos().then((data) => {
      this.articulos = data.data;
    });
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
