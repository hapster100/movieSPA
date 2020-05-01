import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { PopularComponent } from './components/popular/popular.component'
import { TopbarComponent } from './components/topbar/topbar.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PreviewComponent } from './components/preview/preview.component'
import { LoaderComponent } from './components/loader/loader.component'
import { MovieListComponent } from './components/movie-list/movie-list.component'
import { DetailComponent } from './components/detail/detail.component'
import { FavoriteComponent } from './components/favorite/favorite.component'
import { SearchComponent } from './components/search/search.component'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from './modules/material.module'
import { RoutingModule } from './modules/router.module'


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
    MaterialModule,
    FormsModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
