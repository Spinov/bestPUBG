import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TelemetryComponent} from './telemetry.component';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {CommonPubhModule} from '../common/common-pubh.module';
import {TelemetryRoutingModule} from './telemetry-routing.module';

@NgModule({
  declarations: [TelemetryComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    TelemetryRoutingModule,
    CommonPubhModule
  ],
  exports: []
})
export class TelemetryModule { }
