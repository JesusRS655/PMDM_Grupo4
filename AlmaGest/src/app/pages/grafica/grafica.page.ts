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

  // https://valor-software.com/ng2-charts/#BarChart

  idEmpresa: any;
  productos:any = [];
  datosPedidos: any[] = [];
  currentDate = new Date();
  año = this.currentDate.getFullYear();
  mes = this.currentDate.getMonth();
  meses: any[] = [];
  // prueba = this.datosPedidos[1]['order_lines'][1]['article_lines'][1]['num_articles'];

  
  
  ngOnInit() {
    this.dataService.getProductosEmpresa().then((data) => {
      this.productos = data.data;
      console.log(this.productos);
      console.log(this.productos[1])
    });
    this.dataService.getPedidosEmpresa(this.idEmpresa).then((data) => {
      this.datosPedidos = data['data'];
      console.log(this.datosPedidos);
      console.log(this.datosPedidos[0]);
      console.log(this.datosPedidos[0]['order_lines'][0]['articles_line'][0]['num_articles']);
    })

    for (let i = 0; i < 6; i++) {
      if((this.mes-i)<=0){
        this.meses.push((this.mes+(12-i))+'/'+(this.año-1));
      }
      else {
        this.meses.push((this.mes+i)+'/'+this.año);
      }
    }
    console.log(this.meses)
  }

  public barChartOptions: ChartConfiguration['options'] = {
    
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max: 15
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {

    

    labels: [ this.meses[0], this.meses[1], this.meses[2], this.meses[3], this.meses[4], this.meses[5]],
    datasets: [
      { data: [ 
        7, 
        5, 
        10, 
        8, 
        5, 
        5 ], label: 'Ventas' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public update(): void {
    var prueba1 = this.datosPedidos[0]['order_lines'][0]['articles_line'][0]['num_articles']
    var prueba2 = this.datosPedidos[1]['order_lines'][0]['articles_line'][0]['num_articles']
    var prueba3 = this.datosPedidos[2]['order_lines'][0]['articles_line'][0]['num_articles']
    var prueba4 = this.datosPedidos[3]['order_lines'][0]['articles_line'][0]['num_articles']
    var prueba5 = this.datosPedidos[4]['order_lines'][0]['articles_line'][0]['num_articles']
    var prueba6 = this.datosPedidos[5]['order_lines'][0]['articles_line'][0]['num_articles']
    // Only Change 3 values
    // this.barChartData.datasets[0].data = [
    //   Math.round(Math.random() * 100),
    //   59,
    //   80,
    //   Math.round(Math.random() * 100),
    //   56,
    //   Math.round(Math.random() * 100),
    //   40 ];

    this.barChartData.datasets[0].data = [
      prueba1,
      prueba2,
      prueba3,
      prueba4,
      prueba5,
      prueba6,
    ];

    this.chart?.update();
  }
}
