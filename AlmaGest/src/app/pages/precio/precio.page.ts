import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-precio',
  templateUrl: './precio.page.html',
  styleUrls: ['./precio.page.scss'],
})
export class PrecioPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  precio: number;

  @Input() min_precio: number;
  @Input() max_precio: number;
  
  isDisabled: boolean = true;

  ngOnInit() {
  }

  checkPrecio(event){
    console.log(this.min_precio);
    console.log(this.max_precio);

    const precio = event.detail.value;
    console.log(event.detail.value);
    if (precio >= this.min_precio && precio <= this.max_precio) {
      this.isDisabled = false
    }
  }

  submitPrecio(precio) {
    this.modalCtrl.dismiss({
      precio: precio,
    });
  }
}
