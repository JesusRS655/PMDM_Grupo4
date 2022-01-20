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

  ngOnInit() {
    this.dataService.getEmpresas().then((data) => {
      this.empresas = data.data;
    })
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
