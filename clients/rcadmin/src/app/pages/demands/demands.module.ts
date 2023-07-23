import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { DemandsRoutingModule } from './demands-routing.module';
import { DemandsComponent } from './demands.component';
import { DemandFormComponent } from './demand-form/demand-form.component';


@NgModule({
  declarations: [
    DemandsComponent,
    DemandFormComponent
  ],
  imports: [
    CommonModule,
    DemandsRoutingModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class DemandsModule { }
