import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { Subscription, timer, switchMap, catchError, of, filter } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { DroneService } from 'src/app/services/drone.service'
import { Drone } from 'src/app/Drone'
import { Parser } from 'xml2js'
import { Report } from 'src/app/Drone'

@Component({
  selector: 'app-drones',
  templateUrl: './drones.component.html',
  styleUrls: ['./drones.component.css'],
})
export class DronesComponent implements OnInit {
  droneReport: Report

  intervalPeriod: number = 2
  seconds: number
  subscription: Subscription
  parser = new Parser({ trim: true, explicitArray: false })

  constructor(private droneservice: DroneService) {}

  ngOnInit(): void {
    this.droneservice.getDrones().subscribe((data) => {
      this.parser.parseString(data, (err, result: Report) => {
        this.droneReport = result
        console.log(this.droneReport)
      })
    })
  }
}
