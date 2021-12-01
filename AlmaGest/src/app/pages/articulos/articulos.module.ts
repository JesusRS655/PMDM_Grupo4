import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticulosPageRoutingModule } from './articulos-routing.module';

import { ArticulosPage } from './articulos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PrecioPage } from '../precio/precio.page';
import { PrecioPageModule } from '../precio/precio.module';

@NgModule({
  entryComponents: [
    PrecioPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticulosPageRoutingModule,
    PipesModule,
    PrecioPageModule
  ],
  declarations: [ArticulosPage]
})
export class ArticulosPageModule {}
