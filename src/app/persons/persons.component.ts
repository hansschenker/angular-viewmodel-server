import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Person, Viewmodel, VmFn } from './types/types';
import { PersonsService } from './persons.service';
import { Component, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

    // viewmodel holds state changes
    public vm$: Observable<Viewmodel<Person>>;
    // handle state input
    public addState = new Subject<Person>();
    public deleteState = new Subject<Person>();
    public detailState = new Subject<Person>();
    public detailCloseState = new Subject();
    public searchItemState = new Subject<Person>();

  //persons$: Observable<Person[]> = this.svc.persons$;

  constructor(private svc: PersonsService) {
    type vmFn = VmFn<Person> 

    // merge all state changes into viewmodel
    this.vm$ = merge(
      this.dataChange$,
      this.addChange$,
      this.deleteChange$,
      this.detailChange$,
      this.closeDetailChange$,
      this.searchItemChange$
      // todo: Pagination
    ).pipe(
      scan(
        ( oldVm: Viewmodel<Person>, reduceVm: vmFn) => reduceVm(oldVm),
        { items: [] } as Viewmodel<Person>
      )
    );
   } // constructor

// dataChange when Persons loaded
  // http.get<Person[]>(`api/Persons`)
  private dataChange$ = this.svc.persons$.pipe(
    // tap((ps) => console.log("Persons:", ps)),
    map((Persons: Person[]) => (vm: Viewmodel<Person>) => ({
      ...vm,
      items: Persons,
    }))
  );

  // add item
  private addChange$ = this.addState.pipe(
    // tap((u) => console.log("add item:", u)), 
    // tap(p => this.svc.addPerson(p).subscribe(d => console.log("json-server saved:", d))),
    // map((item: Person) => (vm: Viewmodel<Person>) => ({
    //   ...vm,
    //   items: [...vm.items, { ...item }],
    // })),
  );
  // delete item
  private deleteChange$ = this.deleteState.pipe(
    map((item: Person) => (vm: Viewmodel<Person>) => ({
      ...vm,
      items: vm.items.filter((p) => p !== item),
    }))
  );
  // show item details
  private detailChange$ = this.detailState.pipe(
    map((item: Person) => (vm: Viewmodel<Person>) => ({
      ...vm,
      selectedItem: item,
    }))
  );

  // close item details
  private closeDetailChange$ = this.detailCloseState.pipe(
    map((_) => (vm: Viewmodel<Person>) => ({ ...vm, selectedItem: null }))
  );

  // search item by name, color, year
  private searchItemChange$ = this.searchItemState.pipe(
    tap((o) => console.log("searchItem-change:", o)),
    map((item: Person) => (vm: Viewmodel<Person>) => ({
      ...vm,
      searchItem: item,
      searchItems: vm.items.filter((itm) => {
        if (item.name.length > 0) {
          console.log("search name");
          // item.color = "";
          // item.year = 0;
          return itm.name === item.name;
        }
        if (item.age > 0) {
          console.log("search year");
          //item.color = "";
          item.name = "";
          return itm.age.toString() === item.age.toString();
        }
        // if (item.color.length > 0) {
        //   console.log("search color");
        //   item.age = 0;
        //   item.name = "";
        //   return itm.color === item.color;
        // }
      }),
    }))
  );

  ngOnInit(): void {
  }
 
} // class
