import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Pilot } from '../Pilot'

const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .append('Accept', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type'),
  //responseType: 'text' as 'json',
}

@Injectable({
  providedIn: 'root',
})
export class PilotService {
  apiUrl: string = 'https://assignments.reaktor.com/birdnest/pilots'

  constructor(private http: HttpClient) {}

  getPilot(serialNumber: string): Observable<any> {
    return this.http.get<Pilot>(`/pilots/${serialNumber}`, httpOptions)
  }
}
