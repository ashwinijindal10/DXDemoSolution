import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { DirectorListComponent } from './director-list/director-list.component';
import { AddMovieComponent } from './add-movie/add-movie.component';

const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'movies/add', component: AddMovieComponent },
  { path: 'movies/edit/:id', component: AddMovieComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'directors', component: DirectorListComponent },
  { path: 'actors', component: ActorListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouteModule {

  public static Components = [
    HomeComponent,
    MovieListComponent,
    ActorListComponent,
    DirectorListComponent,
    AddMovieComponent
  ]

}
