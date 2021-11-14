import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  @Input() usuario;

  constructor(private modalCtrl: ModalController, private dataService: DataService) { }

  ngOnInit() {
  }

  cancelar(){
    this.modalCtrl.dismiss();
  }

  submitEditar(usuario) {
    this.modalCtrl.dismiss({
      usuario: usuario
    })
  }
}
