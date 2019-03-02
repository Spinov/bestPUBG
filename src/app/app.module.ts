import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {StatService} from './feature/stat/stat.service';
import {FeatureModule} from './feature/feature.module';
import {AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonPubhModule} from "./feature/common/common-pubh.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FeatureModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonPubhModule
  ],
  providers: [StatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
