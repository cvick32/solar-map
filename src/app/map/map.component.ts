import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { } from 'googlemaps';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';
import { Location } from '../location.model';
import { calculatePower } from '../solar-calculation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  title = 'solar-map';
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  drawManager: google.maps.drawing.DrawingManager;
  // start at the MFA
  location: Location = {'lat': 42.3403888, 'lng': -71.09295999999999};
  mapProperties = {
    center: new google.maps.LatLng(this.location.lat, this.location.lng),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  currentShape: google.maps.Polygon;
  currentPower = 0;

  private locationSub: Subscription;

  constructor(public searchService: SearchService) { }

  /**
   * Sets up inital map values and subscription to the
   * current location.
   */
  ngOnInit(): void {
    this.location = this.searchService.getLocation();
    // subscribe to get updated locations
    this.locationSub = this.searchService.getLocationSubscription()
      .subscribe((locationData: {location: Location}) => {
        console.log(this.location);
        this.location = locationData.location;
        this.mapProperties.center = new google.maps.LatLng(this.location.lat, this.location.lng);
        this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
        this.addDrawingToMap();
      });
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
    this.addDrawingToMap();
  }

  /**
   * Delete subscription.
   */
  ngOnDestroy() {
    this.locationSub.unsubscribe();
  }

  /**
   * Add the drawingManager API to the map, with addShape listener.
   */
  addDrawingToMap() {
    this.drawManager = new google.maps.drawing.DrawingManager();
    this.drawManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON); // only allow polygons drawing
    this.drawManager.setMap(this.map);
    google.maps.event.addListener(this.drawManager, 'overlaycomplete', this.addShape);
  }
  /**
   * Add a completed shape into the list of shapes currently available
   * and calculate power.
   * @param event completed shape event
   */
  addShape(event) {
    if (this.currentShape) {
      // enforce that only one shape is drawn on the map
      this.currentShape.setMap(null);
    }
    this.currentShape = event.overlay;
    // result of the polygon's area in square meters
    // (https://developers.google.com/maps/documentation/javascript/reference/geometry#spherical.computeArea)
    const area = google.maps.geometry.spherical.computeArea(this.currentShape.getPath());
    this.currentPower = calculatePower(area);
  }
}
