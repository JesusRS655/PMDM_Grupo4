import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "src/app/services/data.service";
import { ModalController } from "@ionic/angular";
import { Producto } from "../../interfaces/producto";
import { PrecioPage } from "../precio/precio.page";

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {

  constructor(
    public router: Router,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private modal_Ctrl: ModalController
  ) { }

  articulos: any[] = [];
  productos: Producto[] = [];

  producto: Producto;

  id: number;
  family: number;
  precio: number;
  max_precio: number;
  min_precio: number;

  isDisabled = true;
  texto = "";

  info: string = "";

  ngOnInit() {
    this.dataService.getArticulos().then((data) => {
      this.articulos = data.data;
    });
  }

  checkValue(event) {
    this.info = event.target.name.split(";");
    this.id = parseInt(this.info[0]);
    this.family = parseInt(this.info[1]);
    this.min_precio = parseInt(this.info[2]);
    this.max_precio = parseInt(this.info[3]);
    if (event.target.checked === false) {
      this.productos = this.productos.filter((n) => n.idProducto !== this.id);
    } else {
      this.modalPrecio(this.min_precio, this.max_precio);
    }
    if (this.productos.length > 0) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  addToCatalogo() {
    this.modalCtrl.dismiss({
      productos: this.productos,
    });
    console.log(this.productos);

    for (let i = 0; i < this.productos.length; i++) {
      this.dataService.addProducto(
        this.productos[i].idProducto,
        this.productos[i].precioProducto,
        this.productos[i].familyProducto
      );
    }
    this.recargar();
  }

  buscar(event) {
    this.texto = event.detail.value;
  }

  async modalPrecio(min_precio, max_precio) {
    const modal = await this.modal_Ctrl.create({
      component: PrecioPage,
      componentProps: {
        min_precio: min_precio,
        max_precio: max_precio,
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
    this.precio = parseInt(data.precio);
    this.productos.push({
      idProducto: this.id,
      familyProducto: this.family,
      precioProducto: this.precio,
    });
    if (this.productos.length > 0) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  recargar(){
    this.ngOnInit();
    this.router.navigateByUrl('/catalogo')
    console.log('recarga');
  }
}
