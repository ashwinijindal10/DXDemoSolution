import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movie World';
  routes = [
    { title: 'Add New Movie', url: '/movies/add', icon: 'add' },
    { title: 'Movies', url: '/movies', icon: 'movie' },
    { title: 'Actors', url: '/actors', icon: 'local_movies' },
    { title: 'Producers', url: '/directors', icon: 'movie_filter' },
  ]
}
