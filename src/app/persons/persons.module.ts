import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsComponent } from './persons.component';
import { PersonListComponent } from './components/person-list/person-list.component';


@NgModule({
  declarations: [PersonsComponent, PersonListComponent],
  imports: [
    CommonModule,
    PersonsRoutingModule
  ],
  exports: [PersonListComponent]
})
export class PersonsModule { }
