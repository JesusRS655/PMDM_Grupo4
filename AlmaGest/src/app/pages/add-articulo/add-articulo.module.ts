import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddArticuloPageRoutingModule } from './add-articulo-routing.module';

import { AddArticuloPage } from './add-articulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddArticuloPageRoutingModule
  ],
  declarations: [AddArticuloPage]
})
export class AddArticuloPageModule {}
