import { NgModule } from '@angular/core';
import {CommonModule as NgCommon} from '@angular/common';
import { RouterModule } from '@angular/router';


import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatIconModule, MatToolbarModule} from "@angular/material";

@NgModule({
  imports: [
    NgCommon,
    RouterModule,
    MatToolbarModule,
    MatIconModule

  ],

  exports: [
    ToolbarComponent
  ],
  declarations: [ToolbarComponent]
})
export class CommonPubhModule { }
