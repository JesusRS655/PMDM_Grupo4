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
  ) { }

  // https://valor-software.com/ng2-charts/#BarChart

  datosPedidos: any[] = [];
  currentDate = new Date();
  año = this.currentDate.getFullYear();
  mes = this.currentDate.getMonth();
  meses: any[] = [
    this.mes+1+'/'+this.año,
    this.mes+2+'/'+this.año,
    this.mes+3+'/'+this.año,
    this.mes+4+'/'+this.año,
    this.mes+5+'/'+this.año,
    this.mes+6+'/'+this.año,
  ];

  
  ngOnInit() {
    this.dataService.getPedidosEmpresa().then((data) => {
      this.datosPedidos = data.data;
    })

    // for (let i = 0; i < 6; i++) {
    //   if((this.currentDate.getMonth()-i)<0){
    //     this.meses.push((this.mes+(11-i))+'/'+(this.año-1));
    //   }
    //   else {
    //     this.meses.push((this.mes+i)+'/'+this.año);
    //   }
    // }
  }

  public barChartOptions: ChartConfiguration['options'] = {
    
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
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
      { data: [ 65, 59, 80, 81, 56, 55 ], label: 'Ventas' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  // public randomize(): void {
  //   // Only Change 3 values
  //   this.barChartData.datasets[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     Math.round(Math.random() * 100),
  //     56,
  //     Math.round(Math.random() * 100),
  //     40 ];

  //   this.chart?.update();
  // }
}
