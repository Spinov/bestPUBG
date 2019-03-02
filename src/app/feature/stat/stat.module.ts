import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StatComponent} from './stat.component';
import {StatRoutingModule} from './stat-routing.module';
import {CoreModule} from '../../core/core.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [StatComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    StatRoutingModule
  ],
})
export class StatModule { }
