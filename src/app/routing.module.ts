import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { ListComponent } from './pages/list/list.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'details',
    component:DetailsComponent
  },
  {
    path:'list',
    component:ListComponent
  },
  {
    path:'admin',
    component:DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }