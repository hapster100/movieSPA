import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../interfaces/Movie'

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() imgUrl: string
  @Input() id: number

  loading: boolean = true

  constructor() {}

  ngOnInit(): void {}

}
