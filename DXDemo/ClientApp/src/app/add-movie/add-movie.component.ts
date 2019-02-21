import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AddPersonComponent } from '../add-person/add-person.component';
import { PersonType, Person, ActionStatus, Movie } from '../models/model';
import { MovieService } from '../shared/services/movie.service';
import { MessageService } from '../shared/services/message.service';
import { PopupService } from '../shared/services/popup.service';
import { PersonService } from '../shared/services/person.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  post: any = '';
  formGroup: FormGroup;
  procedures: Person[] = [];
  actors: Person[] = [];

  constructor(
    private movieSvc: MovieService,
    private personSvc: PersonService,
    private popupSvc: PopupService,
    private formBuilder: FormBuilder,
    private msgSvc: MessageService,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.personSvc.getPeople(PersonType.Actor).subscribe(f => {
      this.actors = f;
    });
    this.personSvc.getPeople(PersonType.Producer).subscribe(f => {
      this.procedures = f;
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required]],
      'year_of_release': [null, Validators.required],
      'plot': [null],
      'actors': [null],
      'poster': [null],
      'producer': [null],
    });
  }

  onSubmit(movie:Movie) {
     this.movieSvc.addMovie(movie);
    //  .subscribe((f:any)=>{

    //  });
     this.msgSvc.ShowMsg("Movie saved successfully", ActionStatus.Success);
    return false;
  }


  openRepDialog(type: PersonType) {
    this.popupSvc.showPopup(AddPersonComponent, { type },
      (res: Person) => {
        if (res) {
          res.Type = type;
          this.personSvc.addPeople(res);
          this.personSvc.getPeople(type).subscribe(f => {
            if (type == PersonType.Actor)
              this.actors = f;
            else
              this.procedures = f;
          });
          this.msgSvc.ShowMsg(`${PersonType.Actor ? 'Actor' : 'Producer'} saved successfully`, ActionStatus.Success);
        }
      });
  }

  addProducer() {
    this.openRepDialog(PersonType.Producer);
    return false;
  }

  addActor() {
    this.openRepDialog(PersonType.Actor);
    return false;
  }
}



