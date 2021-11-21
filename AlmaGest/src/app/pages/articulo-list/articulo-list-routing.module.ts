import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticuloListPage } from './articulo-list.page';

const routes: Routes = [
  {
    path: '',
    component: ArticuloListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticuloListPageRoutingModule {}
