import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-articulo',
  templateUrl: './add-articulo.page.html',
  styleUrls: ['./add-articulo.page.scss'],
})
export class AddArticuloPage implements OnInit {

  constructor() { }
  
  minimo = Array.from(Array(50).keys());
  maximo = Array.from(Array(99).keys());
  colores = ['Blanco', 'Azul', 'Amarillo', 'Rojo', 'Verde', 'Ocre', 'Morado'];
  pesos = ['0,25 kg', '0,5 kg', '1 kg', '2 kg', '5 kg', '25 kg'];
  vSimple = ['3cm', '5cm', '10cm', '20cm', '30cm'];
  compuestoAncho = ['5 cm', '10 cm', '15 cm', '20 cm', '30 cm', '50 cm', '60 cm'];
  compuestoAlto = ['0,25 cm', '0,5 cm', '1 cm', '2 cm', '5 cm', '25 cm'];
  opt: number;
  articulo = {
    description: '',
    price_min: 0,
    price_max: 50,
    color_name: '',
    weight: 0,
    size: '',
    family_id: ''
  };

  ngOnInit() {
  }
}