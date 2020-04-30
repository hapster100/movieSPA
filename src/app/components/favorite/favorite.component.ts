import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { FavoritesService } from '../../services/favorites.service';
import { Movie } from '../../interfaces/Movie';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  movies: Movie[] = []

  constructor(
    private movieApi: MoviesService,
    private favorService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.favorService.ids$.subscribe(ids => {
      this.movies = []
      ids.forEach(id => {
        this.movieApi.getMovieDetails(id).subscribe(m => this.movies.push(m))
      })
    })
  }
}
