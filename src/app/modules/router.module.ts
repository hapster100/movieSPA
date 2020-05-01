    
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PopularComponent } from '../components/popular/popular.component'
import { FavoriteComponent } from '../components/favorite/favorite.component'
import { DetailComponent } from '../components/detail/detail.component'
import { SearchComponent } from '../components/search/search.component'


const routes: Routes = [
  { path: 'popular', component: PopularComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'movie/:id', component: DetailComponent },
  { path: 'search', component: SearchComponent},
  { path: '**', redirectTo: 'popular' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }