import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.page.html',
  styleUrls: ['./grafica.page.scss'],
})
export class GraficaPage implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private dataService: DataService
  ) {
    this.idEmpresa=dataService.empresa
   }


  idEmpresa: any;
  idProducto: number;
  productos:any = [];
  datosPedidos: any[] = [];
  currentDate = new Date();
  mes = this.currentDate.getMonth();
  año = this.currentDate.getFullYear();
  meses: any[] = [];
  años:  any[] = [];
  fechas: any[] = [];
  ventas: any[] = [ 0, 0, 0, 0, 0, 0 ];
  
  ngOnInit() {
    this.dataService.getProductosEmpresa().then((data) => {
      this.productos = data.data;
      // console.log(this.productos)
    });
    this.dataService.getPedidosEmpresa(this.idEmpresa).then((data) => {
      this.datosPedidos = data['data'];
      // console.log(this.datosPedidos);
    })
    this.ultimosMeses();
  }

  public barChartOptions: ChartConfiguration['options'] = {
    
    responsive: true,
    maintainAspectRatio: false,
    
    scales: {
      x: {},
      y: {
        min: 0,
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        display: false,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {

    labels: this.fechas,
    datasets: [
      { data: this.ventas, label: 'Ventas' }
    ]
  };

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  async ultimosMeses() {
    for (let i = 0; i < 6; i++) {
      if((this.mes-i)<=0){
        this.meses.push(this.mes+(12-i));
        this.años.push(this.año-1);
      }
      else {
        this.meses.push(this.mes+i);
        this.años.push(this.año);
      }
    }
    for (let i = 0; i < 6; i++) {
        this.fechas.push(this.meses[i]+'/'+this.años[i])
    }
  }

  public update(): void {

    this.barChartData.datasets[0].data = this.ventas;

    this.chart?.update();
  }

  async generar() {
    this.ventas = [ 0, 0, 0, 0, 0, 0 ]
    for (let a = 0; a < this.datosPedidos.length; a++) {

      for (let b = 0; b < this.datosPedidos[a]['order_lines'].length; b++) {

        for (let c = 0; c < this.datosPedidos[a]['order_lines'][b]['articles_line'].length; c++) {

          if (this.datosPedidos[a]['order_lines'][b]['articles_line'][c]['article_id']===this.idProducto) {

            let fechaPedido = new Date(this.datosPedidos[a]['order_lines'][b]['issue_date']);
            for (let d = 0; d < this.meses.length; d++) {
              
              if (fechaPedido.getMonth()===this.meses[d+1]) {
                this.ventas[d+1]+=this.datosPedidos[a]['order_lines'][b]['articles_line'][c]['num_articles'];
                // console.log(this.datosPedidos[a])
              }
            }
          }
        }
      }
    }

    this.barChartData.datasets[0].data = this.ventas;

    this.chart?.update();
  }
  
}
