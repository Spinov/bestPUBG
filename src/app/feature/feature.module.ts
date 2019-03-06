import {NgModule} from '@angular/core';
import {StatModule} from './stat/stat.module';
import {TelemetryModule} from './telemetry/telemetry.module';



@NgModule({
  imports: [],

  exports: [
    StatModule,
    TelemetryModule
  ],

  declarations: [],

})
export class FeatureModule {
}
