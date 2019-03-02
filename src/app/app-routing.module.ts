import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '**', redirectTo: '/stat' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true, enableTracing: true }
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
