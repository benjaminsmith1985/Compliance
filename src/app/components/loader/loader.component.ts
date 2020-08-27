import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit {

  constructor(
    public globals: Globals
  ) { }

  ngOnInit() {
  }

}
