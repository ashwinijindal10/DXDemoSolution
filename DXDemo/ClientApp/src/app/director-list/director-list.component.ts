import { Component, OnInit } from '@angular/core';
import { PersonService } from '../shared/services/person.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { PersonType, Person } from '../models/model';

@Component({
  selector: 'app-director-list',
  templateUrl: './director-list.component.html',
  styleUrls: ['./director-list.component.css']
})
export class DirectorListComponent implements OnInit {
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
    return this.dataService.getPeople(PersonType.Producer);
  }

  disconnect() {
  }
}
