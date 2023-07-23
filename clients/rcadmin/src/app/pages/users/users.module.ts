import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs'
import { MatListModule } from '@angular/material/list';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ClientsComponent } from './clients/clients.component';
import { WorkersComponent } from './workers/workers.component';
import { AdminsComponent } from './admins/admins.component';
import { UserItemComponent } from './user-item/user-item.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    ClientsComponent,
    WorkersComponent,
    AdminsComponent,
    UserItemComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTabsModule,
    MatListModule,
    MatIconModule
  ]
})
export class UsersModule { }
