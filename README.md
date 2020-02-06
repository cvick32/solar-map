# SolarMap
This project implements search and drawing functionality over US addresses. Once a polygon has been drawn on the map, the website will generate the nominal power from the given polygon, as if the area of the polygon was covered in solar panels. Only one polygon can be drawn on the map at a time. 

Google Maps API: I used the Google Maps API because it offered search and drawing capabilities out of the box. The documentation was also very clear, so the overhead was minimal.

Solar Assumptions: After reading a few online resources, I decided on my values for the average wattage and efficiency per square meter of paneling (src/solar-calculation.ts). I linked to the wiki entry where I found the bounding values for my assumptions in the file

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

