import { Injectable } from '@angular/core';
import { MoviesService } from './movies.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private lsKey = 'favorite_movies';

  private ids: number[]

  constructor() {
    const record = localStorage.getItem(this.lsKey) 
    if(record) {
      this.ids = record.split(':').map(Number)
    } else {
      localStorage.setItem(this.lsKey, '')
      this.ids = []
    }
  }

  private save(ids: number[]) {
    localStorage.setItem(this.lsKey, ids.join(':'))
  }

  get() {
    return this.ids
  }

  delete(id: number) {
    this.ids = this.ids.filter(i => i != id)
    this.save(this.ids)
  }

  add(id: number) {
    this.ids.push(id)
    this.save(this.ids)
  }

}
