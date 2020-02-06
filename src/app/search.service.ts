import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Location } from './location.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  geocode_api_key = 'AIzaSyBjKsbllXLmt1ZoLCRkancgWbYK7EwUKeM';
   // region is us so we only return addresses in the United States, per the problem description
  region = 'us';
  api_url = 'https://maps.googleapis.com/maps/api/geocode/json';
  location: Location;
  locationUpdated = new Subject<{location: Location}>();

  constructor(private http: HttpClient) { }

  /**
   * Given an address, this method sends an API request to
   * retrieve the latitude and longitude of the location.
   * It thens updates any listeners to the location.
   * @param address address to look up
   */
  searchAddress(address: string) {
    const api_call = `${this.api_url}?address=${address}&key=${this.geocode_api_key}&region=${this.region}`;
    this.http.get(api_call).subscribe((response: any) => {
      this.location = response.results[0].geometry.location;
      this.locationUpdated.next({location: this.location});
    });
  }

  getLocation() {
    return this.location;
  }

  /**
   * Returns an Observable to the caller which updates with
   * the location.
   */
  getLocationSubscription() {
    return this.locationUpdated.asObservable();
  }
}
