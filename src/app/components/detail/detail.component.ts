import { Component, OnInit } from '@angular/core' 
import { Movie, MovieDetail } from '../../interfaces/Movie' 
import { MoviesService } from '../../services/movies.service' 
import { ActivatedRoute, Router } from '@angular/router' 
import { switchMap, catchError } from 'rxjs/operators'
import { FavoritesService } from '../../services/favorites.service' 
import { throwError } from 'rxjs' 
import { HttpErrorResponse } from '@angular/common/http' 

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
    private route: ActivatedRoute,
    private router: Router,
    private favorService: FavoritesService
  ) {}

  private loadMovieDetails() {
    this.loadingMovie = true
    this.route.paramMap.pipe(
      switchMap(params => {
        this.id = +params.get('id')
        return this.movieApi.getMovieDetails(this.id)
      }),
      catchError((e) => {
        this.router.navigate(['/popular'])
        return throwError(e)
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
    this.route.params.subscribe(() => {
      this.loadMovieDetails()
      this.loadRecomendations()
    })
  }

  realeaseDate() {
    return new Date(this.movie.release_date)
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
