import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { PopularComponent } from './popular/popular.component'
import { TopbarComponent } from './topbar/topbar.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { PreviewComponent } from './preview/preview.component'
import { LoaderComponent } from './loader/loader.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { DetailComponent } from './detail/detail.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { SearchComponent } from './search/search.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    TopbarComponent,
    PopularComponent,
    AppComponent,
    PreviewComponent,
    LoaderComponent,
    MovieListComponent,
    DetailComponent,
    FavoriteComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'popular', component: PopularComponent },
      { path: 'favorite', component: FavoriteComponent },
      { path: 'movie/:id', component: DetailComponent },
      { path: 'search', component: SearchComponent},
      { path: '**', redirectTo: 'popular' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
