import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { PersonService } from '../shared/services/person.service';
import { PersonType, Person } from '../models/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {
  displayedColumns = ['name', 'dob', 'bio', 'delete','edit'];
  dataSource = new PostDataSource(this.dataService);

  constructor(private dataService: PersonService) { }

  ngOnInit() {
  }

}


export class PostDataSource extends DataSource<any> {
  constructor(private dataService: PersonService) {
    super();
  }

  connect(): Observable<Person[]> {
    return this.dataService.getPeople(PersonType.Actor);
  }

  disconnect() {
  }
}
