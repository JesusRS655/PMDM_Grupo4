import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { EditarPage } from '../editar/editar.page';
import { EditarPageModule } from '../editar/editar.module';

@NgModule({
  entryComponents: [
    EditarPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    ComponentsModule,
    EditarPageModule
  ],
  declarations: [AdminPage, EditarPage]
})
export class AdminPageModule {}
