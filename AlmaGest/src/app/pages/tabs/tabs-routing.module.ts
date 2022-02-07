import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
      path: "user-list",
      loadChildren: () => import('../user-list/user-list.module').then( m => m.UserListPageModule)
      },
      {
        path: "grafica",
        loadChildren: () => import('../grafica/grafica.module').then( m => m.GraficaPageModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
