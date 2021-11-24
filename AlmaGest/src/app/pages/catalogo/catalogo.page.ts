import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  articulos: any[] = [];

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

  // recargar(){
  //   this.ngOnInit();
  //   this.router.navigateByUrl('/tabs/user-list')
  //   console.log('recarga');
  // }

  // refrescar(event) {
  //   setTimeout(() => {
  //     this.recargar();
  //     event.target.complete();
  //   }, 1500);
  // }
}
