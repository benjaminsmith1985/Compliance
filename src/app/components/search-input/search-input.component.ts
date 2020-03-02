import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject, empty } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Media } from '../../models/media';
import { MediaService } from '../../services/media.service';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.less']
})
export class SearchInputComponent implements OnInit {
  medias$: Observable<Media[]>;
  searchedMedias$: Observable<Media[]>; 
  private searchTerms = new Subject<string>();
  private searchResults = new Subject<string>();

  constructor(
    private mediaService: MediaService,
    private _location: Location
  ) {

  }

  @ViewChild("searchBox") nameField: ElementRef;

  editName(): void {
    this.nameField.nativeElement.focus();
  }

  search(term: string): void {
    this.mediaService.searchMedias(term)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        
      },
      error => {
        // this.alertService.error(error);
        // this.loading = false;
      });
  }

 

  ngOnInit() {
    this.editName();
    this.searchedMedias$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(200),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.mediaService.searchMedias(term)),
    );
  }
}
