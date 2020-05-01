import { Component, OnInit, HostListener } from '@angular/core' 
import { MoviesService } from '../../services/movies.service' 
import { Movie } from '../../interfaces/Movie'
import { ActivatedRoute } from '@angular/router' 

@Component({
  selector: 'app-popular',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  page: number = 0
  allPagesLoad: boolean = false
  loading: boolean = false
  movies: Movie[] = []

  search: string = ''

  constructor(
    private moviesApi: MoviesService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.page = 0
      this.allPagesLoad = false
      this.movies = []
      this.search = params.get('str')
      this.loadNextPage(this.search)
    })
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight 
    let max = document.documentElement.scrollHeight 
    if(pos == max ) {
      this.loadNextPage(this.search)
    }
  }

  private loadNextPage(search: string) {
    if(!this.allPagesLoad) {
      this.page += 1
      this.loading = true
      this.moviesApi.getSearchMovies(search, this.page)
        .subscribe(({ total_pages, results }) => {
          if(search != this.search) return
          if(total_pages <= this.page) this.allPagesLoad = true
          this.movies = [...this.movies, ...results]
          this.loading = false 
        })
    }
  }

}
