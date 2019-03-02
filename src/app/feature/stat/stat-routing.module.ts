import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {StatComponent} from './stat.component';


const statRoutes: Routes = [
  { path: '', redirectTo: '/stat', pathMatch: 'full' },
  {
    path: 'stat',
    component: StatComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(statRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StatRoutingModule { }
