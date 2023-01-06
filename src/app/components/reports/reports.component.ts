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
export class ReportsComponent implements OnInit {
  droneReports: Report[] = []
  droneList: Drone[] = []
  intervalPeriod: number = 120000
  parser = new Parser({ trim: true, explicitArray: false })
  interval_: Observable<number>

  constructor(private droneservice: DroneService) {
    this.interval_ = interval(this.intervalPeriod).pipe(
      startWith(0),
      switchMap(() => this.droneservice.getDrones())
    )
  }

  ngOnInit(): void {
    this.interval_.subscribe((data) => {
      this.parser.parseString(data, (err, result: Report) => {
        this.droneReports.push(result)
        //console.log(this.droneReports)
        this.getDroneList(result)
      })
    })
  }

  getDroneList(report: Report) {
    console.log(this.droneReports)
    report.report.capture.drone.forEach((drone) => {
      this.droneList.push(drone)
    })
    console.log(this.droneList)
  }
}
