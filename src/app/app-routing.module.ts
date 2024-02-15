import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(p => p.HomeModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then(p => p.DetailsModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module').then(p => p.ListModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(p => p.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
