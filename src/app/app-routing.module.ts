import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TelemetryComponent} from './feature/telemetry/telemetry.component';

const routes: Routes = [
  { path: '', redirectTo: '/stat', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
  { path: 'telemetry', redirectTo: '/telemetry', pathMatch: 'full'},
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
