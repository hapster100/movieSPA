import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieDetail, Genre } from '../interfaces/Movie'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { tmdbConfig } from '../tmdb.config'

interface MovieListResponse {
  readonly page: number
  readonly results: Movie[]
  readonly total_pages: number
  readonly total_results: number
}

interface GenreListResponse {
  readonly genres: Genre[]
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private base: string = tmdbConfig.base
  private imgBase: string = tmdbConfig.imgBase
  private apiKey: string = tmdbConfig.apiKey
  private imgDefault: string = tmdbConfig.imgDefault
  genres$: Observable<Genre[]> 

  constructor(
    private http: HttpClient
  ) { 
    this.genres$ = this.getGenres().pipe(map(res => res.genres))
  }

  private addPostarUrlBase<T extends Movie>(imgBase: string) { 
    return (m: T): T => {
      const withPoster = { ...m, poster_path: m.poster_path ? this.imgBase + m.poster_path : this.imgDefault } 
      return withPoster
    }
  }

  getPopularMovies(page: number = 1) {
    return this.http.get<MovieListResponse>(this.base + '/movie/popular', {
      params: {
        api_key: this.apiKey,
        page: page.toString()
      }
    }).pipe(map(res => ({...res, results: res.results.map(this.addPostarUrlBase(this.imgBase))})))
  }

  getSearchMovies(search: string, page: number = 1) {
    return this.http.get<MovieListResponse>(this.base + '/search/movie', {
      params: {
        api_key: this.apiKey,
        page: page.toString(),
        query: search.replace('%25', ' ')
      }
    }).pipe(map(res => ({...res, results: res.results.map(this.addPostarUrlBase(this.imgBase))})))
  }

  getMovieDetails(id: number) {
    return this.http.get<MovieDetail>(this.base + `/movie/${id}`, {
      params: {
        api_key: this.apiKey
      }
    }).pipe(
      map(this.addPostarUrlBase(this.imgBase)),
      map(m => ({...m, genre_ids: m.genres.map(g => g.id)}))
    )
  }

  getMovieRecommendations(id: number, page: number = 1) {
    return this.http.get<MovieListResponse>(this.base + `/movie/${id}/recommendations`, {
      params: {
        api_key: this.apiKey,
        page: page.toString()
      }
    }).pipe(map(res => ({...res, results: res.results.map(this.addPostarUrlBase(this.imgBase))})))
  }

  private getGenres() {
    return this.http.get<GenreListResponse>(this.base + '/genre/movie/list', {
      params: {
        api_key: this.apiKey 
      }
    })
  }

}
