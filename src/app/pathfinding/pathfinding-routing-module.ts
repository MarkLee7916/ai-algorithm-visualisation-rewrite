import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';

const routes: Routes = [
  {
    path: 'pathfinding',
    component: PageComponent,
  },
  {
    path: '',
    redirectTo: '/pathfinding',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PathfindingRoutingModule { }
