import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { Subscription, Observable, interval, startWith, switchMap } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { DroneService } from 'src/app/services/drone.service'
import { Drone } from 'src/app/Report'
import { Parser } from 'xml2js'
import { Report } from 'src/app/Report'

@Component({
  selector: 'app-drones',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  droneReports: Report[] = []
  droneList: Drone[] = []
  intervalPeriod: number = 10000
  parser = new Parser({ trim: true, explicitArray: false })
  intervalSubscription: Subscription
  source: Observable<number>

  constructor(private droneservice: DroneService) {
    // Initialise the source observable with the interval
    this.source = interval(this.intervalPeriod).pipe(
      startWith(0),
      switchMap(() => this.droneservice.getDrones())
    )
  }

  // TODO: get interval and area data from api
  ngOnInit(): void {
    // Subscribe to the source observable and parse the XML
    this.intervalSubscription = this.source.subscribe((data) => {
      this.parser.parseString(data, (err, result: Report) => {
        this.droneReports.push(result)
        //console.log(this.droneReports)
        this.getDroneList(result)
      })
    })
  }

  // Add drones to the list if they are in the NDZ
  getDroneList(report: Report) {
    report.report.capture.drone.forEach((drone) => {
      this.inInNDZ(drone) ? this.droneList.push(drone) : null
    })
    console.log(this.droneList)
  }

  inInNDZ(drone: Drone) {
    var d = Math.sqrt(
      Math.pow(250000 - Number(drone.positionX), 2) +
        Math.pow(250000 - Number(drone.positionY), 2)
    )
    return d < 100000 ? true : false
  }

  ngOnDestroy(): void {
    // Unsubscribe from the source observable
    this.intervalSubscription.unsubscribe()
  }
}
