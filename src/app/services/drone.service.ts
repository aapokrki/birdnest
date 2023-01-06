import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Drone } from '../Report'
import { Observable } from 'rxjs'
import { XMLParser } from 'fast-xml-parser'

const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'text/xml')
    .append('Access-Control-Allow-Methods', 'GET')
    .append('Access-Control-Allow-Origin', '*')
    .append('Access-Control-Allow-Headers', 'GET'),
  responseType: 'text' as 'json',
}

@Injectable({
  providedIn: 'root',
})
export class DroneService {
  apiUrl: string = 'https://assignments.reaktor.com/birdnest/drones'

  constructor(private http: HttpClient) {}

  getDrones(): Observable<any> {
    return this.http.get('/drones', httpOptions)
  }
}
