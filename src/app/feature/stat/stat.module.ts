import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StatComponent} from './stat.component';
import {StatRoutingModule} from './stat-routing.module';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {CommonPubhModule} from "../common/common-pubh.module";

@NgModule({
  declarations: [StatComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    StatRoutingModule,
    CommonPubhModule
  ],
})
export class StatModule { }
