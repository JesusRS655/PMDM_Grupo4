import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {
  articulos: any[] = [];
  data = [
    {
      name: 'primary',
      selected: false,
    },
    {
      name: 'secondary',
      selected: true,
    },
    {
      name: 'tertiary',
      selected: false,
    },
    {
      name: 'success',
      selected: true,
    },
  ]

  constructor(
    public router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getArticulos().then((data) => {
      this.articulos = data.data;
      console.log(this.articulos);
    })
  }

  checkValue(event) {
    console.log(event.target)
  }
}
