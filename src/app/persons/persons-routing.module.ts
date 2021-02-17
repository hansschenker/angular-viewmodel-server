import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Persons
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonsComponent } from './persons.component';

const routes: Routes = [
  { path: '', component: PersonsComponent, children: [
  { path:'list', component: PersonListComponent}
] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
