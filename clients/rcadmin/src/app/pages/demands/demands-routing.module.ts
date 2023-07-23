import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandsComponent } from './demands.component';

const routes: Routes = [{ path: '', component: DemandsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandsRoutingModule { }
