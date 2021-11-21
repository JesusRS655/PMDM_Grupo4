import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticuloListPageRoutingModule } from './articulo-list-routing.module';

import { ArticuloListPage } from './articulo-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticuloListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ArticuloListPage]
})
export class ArticuloListPageModule {}
