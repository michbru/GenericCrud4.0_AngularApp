import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  //readonly rootURL : string = 'https://localhost:44317/api/';
  readonly rootURL: string ='https://gencrudcore31apiapp.azurewebsites.net/api'

  constructor(http: HttpClient)  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers.append("access-control-allow-methods", "POST, PUT, DELETE, GET, OPTIONS");
    var url = this.rootURL + 'WeatherForecast/Get';
    http.get<WeatherForecast[]>(url).subscribe(result => {
      this.forecasts = result;
    },);
    // http.get<WeatherForecast[]>(this.rootURL + 'WeatherForecasts/Get').subscribe(result => {
    //   this.forecasts = result;
    // },);
  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

