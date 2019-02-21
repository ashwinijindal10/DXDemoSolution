import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/services/movie.service';
import { Observable } from 'rxjs';
import { Movie, ActionStatus, CofirmationDialogData } from '../models/model';
import { MessageService } from '../shared/services/message.service';
import { PopupService } from '../shared/services/popup.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private movieSvc: MovieService,
    private popupSvc: PopupService,
    private msgSvc: MessageService) {

  }

  ngOnInit() {
  }

  movieList(): Observable<Movie[]> {
    return this.movieSvc.getMovies();
  }

  deleteMovie(id) {
    this.popupSvc.showConfirmation("Delete Movie","Are you sure to delete?", (res: CofirmationDialogData) => {
      if (res.Result == ActionStatus.Success) {
        this.movieSvc.deleteMovie(id);
        this.msgSvc.ShowMsg("Movie deleted successfully", ActionStatus.Success);
      }
    });
    return false;
  }

}
