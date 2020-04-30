import { Component, OnInit, Input } from '@angular/core';
import { Movie, Genre } from '../Movie';
import { MoviesService } from '../movies.service';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  @Input() movies: Movie[]

  genres: Genre[] = []
  
  constructor(
    private movieApi: MoviesService,
    private favorService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.movieApi.getGanres().subscribe(genres => {
      this.genres = genres
    })
  }

  isFavor(id: number) {
    return this.favorService.get().includes(id)
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
