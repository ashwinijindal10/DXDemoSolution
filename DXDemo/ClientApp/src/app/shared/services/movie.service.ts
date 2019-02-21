import { Injectable } from '@angular/core';
import { Movie } from '../../models/model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  API_URL: string = 'api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  ELEMENT_DATA: Movie[] = [
    { id:1, name: 'Post One',  plot: 'Web Development', poster:'',year_of_release :2014},
    { id:2,name: 'Post tow',  plot: 'Web Development', poster:'',year_of_release :2014},
    { id:3,name: 'Post three',  plot: 'Web Development', poster:'',year_of_release :2014},
  ];

  getMovie(id): Observable<Movie> {
    return this.http.get<Movie>(`${this.API_URL}/movie/${id}`);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.API_URL}/movie`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    console.log(movie);

   return this.http.post<Movie>(`${this.API_URL}/movie`, JSON.stringify(movie), this.httpOptions).pipe(
      tap(item => console.log(`added movie w/ id=${item.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );

  }

  deleteMovie(id:number) {
    this.ELEMENT_DATA = [...this.ELEMENT_DATA.slice(0, id), ...this.ELEMENT_DATA.slice(id + 1)];
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

}
