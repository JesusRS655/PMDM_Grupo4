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

  empresas: any[] = [];
  productos: any[] = [];

  isDisabled = true;
  texto = "";

  ngOnInit() {
    this.dataService.getEmpresas().then((data) => {
      this.empresas = data.data;
    })
    this.dataService.getProductosEmpresa().then((data) => {
      this.productos = data.data;
    });
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
