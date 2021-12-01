import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogoPageRoutingModule } from './catalogo-routing.module';

import { CatalogoPage } from './catalogo.page';
import { ArticulosPage } from '../articulos/articulos.page';
import { ArticulosPageModule } from '../articulos/articulos.module';

@NgModule({
  entryComponents: [
    ArticulosPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogoPageRoutingModule,
    ArticulosPageModule
  ],
  declarations: [CatalogoPage]
})
export class CatalogoPageModule {}
