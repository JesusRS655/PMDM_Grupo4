import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioPage } from './usuario.page';

const routes: Routes = [
  {
    path: "",
    component: UsuarioPage,
    children: [
      {
        path: "catalogo",
        loadChildren: () => import('../catalogo/catalogo.module').then( m => m.CatalogoPageModule)
      },
      {
        path: "pedidos",
        loadChildren: () => import('../pedidos/pedidos.module').then( m => m.PedidosPageModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPageRoutingModule {}
