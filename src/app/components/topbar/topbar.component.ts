import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  input: string = ''

  constructor(
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        const { url } = val
        if(!url.includes('/search;str=')) {
          this.input = ''
        }
      }
    })
  }

  inputHandler(value: string) {
    if(value.trim()) {
      this.router.navigate(['/search', {str: value}])
    } else {
      this.router.navigate(['/popular'])
    }
  }

}
