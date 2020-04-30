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
  ) { 
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        const { url } = val
        if(!url.includes('/search;str=')) {
          this.input = ''
        } else {
          const strStart = url.indexOf(';str=') + ';str='.length;
          this.input = url.slice(strStart)
        }
      }
    })
  }

  ngOnInit(): void {
  }

  inputHandler(value: string) {
    if(value.trim()) {
      this.router.navigate(['/search', {str: value.trim().replace(' ', '_')}])
    } else {
      this.router.navigate(['/popular'])
    }
  }

}
