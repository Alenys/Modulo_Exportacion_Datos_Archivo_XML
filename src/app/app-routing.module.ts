import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataTable2Component } from './components/data-table2/data-table2.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { VisualizarComponent } from './components/visualizar/visualizar.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'home',

  },
  {
    path:'sidenav',
    component:SidenavComponent
  },
 
  {
    path:'home',
    component:HomeComponent,
    children:[
      {
        path:'',
        pathMatch:'prefix',
        redirectTo:'table1'
      },
      {
      path:'table1',
      component:DataTableComponent
    },
    {
      path:'table2',
      component:DataTable2Component
    }, 
    {
      path:'visual',
      component:VisualizarComponent
    }
   
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
