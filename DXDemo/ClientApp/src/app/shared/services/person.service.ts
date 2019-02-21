import { Injectable } from '@angular/core';
import { Person, PersonType } from '../../models/model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  ELEMENT_DATA: Person[] = [
    { id:1, name: 'Post One', bio:'',dob :new Date(),sex:'M' , Type: PersonType.Producer },
    { id:2, name: 'Post two', bio:'',dob :new Date(),sex:'M', Type: PersonType.Producer },
    { id:3, name: 'PRdf', bio:'',dob :new Date(),sex:'F', Type: PersonType.Actor },
  ];

  getPeople(personType:PersonType): Observable<Person[]> {
    //return this.http.get<Post[]>(this.postUrl);
    return of<Person[]>(this.ELEMENT_DATA.filter((f:Person)=>f.Type==personType));
  }

  addPeople(person:Person){
      this.ELEMENT_DATA.push(person)
  }

  deletePeople(id:number) {
    this.ELEMENT_DATA = [...this.ELEMENT_DATA.slice(0, id), ...this.ELEMENT_DATA.slice(id + 1)];
  }
}
