import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "admin",
        loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule)
      },
      {
      path: "articulo-list",
      loadChildren: () => import('../articulo-list/articulo-list.module').then( m => m.ArticuloListPageModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
