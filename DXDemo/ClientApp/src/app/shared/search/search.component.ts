import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: string=null;
  constructor() { }

  ngOnInit() {
  }

  showSearchBar() {
    return this.search != null;
  };

  endSearch() {
    return this.search = null;
  };

  submit() {
    console.error('Search function not yet implemented');
  }

  initiateSearch() {
    this.search = '';
  }
}
