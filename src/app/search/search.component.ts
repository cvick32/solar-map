import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(public searchService: SearchService) {}

  onSearchAddress(form: NgForm) {
    this.searchService.searchAddress(form.value.address);
  }
}
