import { Injectable } from '@angular/core';
import { Movie } from '../../models/model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  ELEMENT_DATA: Movie[] = [
    { id:1, name: 'Post One',  plot: 'Web Development', poster:'',year_of_release :2014},
    { id:2,name: 'Post tow',  plot: 'Web Development', poster:'',year_of_release :2014},
    { id:3,name: 'Post three',  plot: 'Web Development', poster:'',year_of_release :2014},
  ];

  getMovies(): Observable<Movie[]> {
    return of<Movie[]>(this.ELEMENT_DATA);
  }

  addMovie(movie:Movie){
      this.ELEMENT_DATA.push(movie);
  }

  deleteMovie(id:number) {
    this.ELEMENT_DATA = [...this.ELEMENT_DATA.slice(0, id), ...this.ELEMENT_DATA.slice(id + 1)];
  }
}
