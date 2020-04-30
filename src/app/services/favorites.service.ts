import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private lsKey = 'favorite_movies';

  private ids: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([])
  ids$: Observable<number[]>

  constructor() {
    const record = localStorage.getItem(this.lsKey) 
    if(record) {
      this.ids.next(record.split(':').map(Number)) 
    } else {
      localStorage.setItem(this.lsKey, '')
      this.ids.next([])
    }
    this.ids$ = this.ids.asObservable();
  }

  private save(ids: number[]) {
    localStorage.setItem(this.lsKey, ids.join(':'))
    this.ids.next(ids)
  }

  delete(id: number) {
    const ids = this.ids.getValue().filter(i => i != id)
    this.save(ids)
  }

  add(id: number) {
    const ids =  [...this.ids.getValue(), id]
    this.save(ids)
  }

  isFavorite(id: number) {
    return this.ids.getValue().includes(id)
  }

}
