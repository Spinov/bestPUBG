import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TelemetryComponent} from './telemetry.component';


const telemetryRoutes: Routes = [
  { path: '', redirectTo: '/telemetry', pathMatch: 'full' },
  {
    path: 'telemetry',
    component: TelemetryComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(telemetryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TelemetryRoutingModule { }
