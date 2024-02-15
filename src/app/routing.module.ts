import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { ListComponent } from './pages/list/list.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CreatePostComponent } from './pages/admin/create-post/create-post.component';
import { TableComponent } from './pages/admin/table/table.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'details/:type/:id',
    component: DetailsComponent
  },
  {
    path: 'list/:type',
    component: ListComponent
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'post/:type',
        component: CreatePostComponent
      },
      {
        path: 'edit/:type/:id',
        component: CreatePostComponent
      },
      {
        path: 'table/:type',
        component: TableComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }