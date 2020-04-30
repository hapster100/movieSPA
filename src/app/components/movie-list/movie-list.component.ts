import { Component, OnInit, Input } from '@angular/core';
import { Movie, Genre } from '../../interfaces/Movie';
import { MoviesService } from '../../services/movies.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  @Input() movies: Movie[]

  genres: Genre[] = []
  favorites: number[]

  constructor(
    private movieApi: MoviesService,
    private favorService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.movieApi.genres$.subscribe(genres => {
      this.genres = genres
    })
    this.favorService.ids$.subscribe(ids => this.favorites = ids)
  }

  isFavor(id: number) {
    return this.favorites.includes(id)
  }

  movieGenres(movie: number[]): string[] {
    return this.genres.filter(g => movie.includes(g.id)).map(g => g.name)
  }

  toogleFavorite(movie: Movie) {
    const { id } = movie
    if(this.isFavor(id)) {
      this.favorService.delete(id)
    } else {
      this.favorService.add(id)
    }
  }

}
