import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserListPageRoutingModule } from './user-list-routing.module';

import { UserListPage } from './user-list.page';
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
    UserListPageRoutingModule,
    EditarPageModule
  ],
  declarations: [UserListPage, EditarPage]
})
export class UserListPageModule {}
