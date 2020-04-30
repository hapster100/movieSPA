import { Component, OnInit, HostListener } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../Movie'

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  private page: number = 0
  private allPagesLoad: boolean = false
  
  public loading: boolean = false
  public movies: Movie[] = []

  constructor(
    private moviesApi: MoviesService
  ) {}

  ngOnInit(): void {
    this.loadNextPage()
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if(pos == max ) {
      this.loadNextPage()
    }
  }

  private loadNextPage() {
    if(!this.allPagesLoad) {
      this.page += 1
      this.loading = true
      this.moviesApi.getPopularMovies(this.page)
        .subscribe(({ total_pages, results }) => {
          if(total_pages <= this.page) this.allPagesLoad = true
          this.movies = [...this.movies, ...results]
          this.loading = false 
        })
    }
  }

}
