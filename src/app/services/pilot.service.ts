import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .append('Access-Control-Allow-Methods', 'GET')
    .append('Access-Control-Allow-Origin', '*')
    .append('Access-Control-Allow-Headers', 'GET'),
  responseType: 'text' as 'json',
}

@Injectable({
  providedIn: 'root',
})
export class PilotService {
  apiUrl: string = 'https://assignments.reaktor.com/birdnest/pilots'

  constructor(private http: HttpClient) {}

  getPilot(serialNumber: string): Observable<any> {
    return this.http.get(`/pilot/${serialNumber}`, httpOptions)
  }
}
