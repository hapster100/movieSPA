import { Component, OnInit } from '@angular/core';
import { Movie, MovieDetail } from '../../interfaces/Movie';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  movie: MovieDetail
  recommends: Movie[] = []
  id: number

  loadingMovie: boolean = false
  loadingRecommendations: boolean = false

  favorite: boolean = false

  constructor(
    private movieApi: MoviesService,
    private router: ActivatedRoute,
    private favorService: FavoritesService
  ) {}

  private loadMovieDetails() {
    this.loadingMovie = true
    this.router.paramMap.pipe(
      switchMap(params => {
        this.id = +params.get('id')
        return this.movieApi.getMovieDetails(this.id)
      })
    ).subscribe(m => {
      this.movie = m
      this.favorite = this.favorService.isFavorite(m.id)
      this.loadingMovie = false
    })
  }

  private loadRecomendations() {
    this.loadingRecommendations = true
    this.movieApi.getMovieRecommendations(this.id).subscribe(res => {
      this.recommends = res.results
      this.loadingRecommendations = false
    })
  }

  ngOnInit(): void {
    this.loadMovieDetails()
    this.loadRecomendations()
    this.router.params.subscribe(() => {
      this.loadMovieDetails()
      this.loadRecomendations()
    })
  }

  companyNames() {
    const getName = (company): string => company.name
    return this.movie.production_companies.map(getName).join(', ')
  }

  genreNames() {
    const getGenre = (genre): string => genre.name;
    return this.movie.genres.map(getGenre).join(', ')
  }

  toogleFavorite() {
    const { id } = this.movie
    if(this.favorite) {
      this.favorService.delete(id)
    } else {
      this.favorService.add(id)
    }
    this.favorite = ! this.favorite
  }
}
