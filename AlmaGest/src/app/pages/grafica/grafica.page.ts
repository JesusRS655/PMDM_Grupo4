import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.page.html',
  styleUrls: ['./grafica.page.scss'],
})
export class GraficaPage implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  pedidos: any[] = [];

  ngOnInit() {
    this.dataService.getPedidos().then((data) => {
      this.pedidos = data.data;
    })
  }

}
