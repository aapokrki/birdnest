import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core'
import {
  Subscription,
  Observable,
  interval,
  startWith,
  switchMap,
  throwError,
} from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { DroneService } from 'src/app/services/drone.service'
import { Drone } from 'src/app/Report'
import { Parser } from 'xml2js'
import { Report } from 'src/app/Report'
import { DatePipe, formatDate } from '@angular/common'

@Component({
  selector: 'app-drones',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  droneList: Drone[] = []
  intervalPeriod: number = 2000
  radiusNDZ: number = 100
  persistTime: number = 600000
  parser = new Parser({ trim: true, explicitArray: false })
  intervalSubscription: Subscription
  source: Observable<number>

  constructor(private droneservice: DroneService) {
    // Initialise the source observable with the interval
    this.source = interval(this.intervalPeriod).pipe(
      startWith(0),
      switchMap(() => {
        return this.droneservice.getDrones()
      })
    )
  }

  ngOnInit(): void {
    // Start the API calls
    this.startApiCalls()
  }

  startApiCalls() {
    this.intervalSubscription = this.source.subscribe(
      (res) => {
        // Parse the XML response and update the drone list
        this.parser.parseString(res, (err, result: Report) => {
          this.updateDroneList(result)
        })
      },
      (err) => {
        console.log('HTTP Error', err)
        this.intervalSubscription.unsubscribe()

        // Retry after 60 seconds if too many requests have been sent
        if (err.status == 429) {
          setTimeout(() => {
            this.startApiCalls()
          }, 60000)
        }
      }
    )
  }

  //Check if report has drones that violate the NDZ and remove old drones
  updateDroneList(report: Report) {
    this.removeOldDrones()

    const date: Date = report.report.capture.$.snapshotTimestamp

    report.report.capture.drone.forEach((drone) => {
      var dist = this.getDistanceFromNest(drone)
      if (dist <= this.radiusNDZ) {
        // Add the distance and time to the drone object and add to list
        drone.distance = dist
        drone.date = date
        this.addDroneToList(drone)
      }
    })
  }

  // Add a drone to the list if it is not already there,
  // otherwise update the position if it is closer than before
  addDroneToList(drone: Drone) {
    var d = this.droneList.find((d) => d.serialNumber === drone.serialNumber)
    if (d === undefined) {
      this.droneList.push(drone)
    } else {
      // Update the position of the drone in the list
      if (d.distance > drone.distance) {
        d.positionX = drone.positionX
        d.positionY = drone.positionY
        d.distance = drone.distance
        d.date = drone.date

        // Sort the list by distance from the nest
        this.droneList.sort((a, b) => a.distance - b.distance)
      }
    }
  }

  // Remove drones from the list if the report is older than 10 minutes
  removeOldDrones(): void {
    var now = new Date()
    this.droneList.forEach((drone) => {
      var reportDate = new Date(drone.date)

      var diff = now.getTime() - reportDate.getTime()

      if (diff > this.persistTime) {
        this.droneList.splice(this.droneList.indexOf(drone), 1)
        console.log(this.droneList.length)
      }
    })
  }

  getDistanceFromNest(drone: Drone): number {
    var distance = Math.sqrt(
      Math.pow(250000 - Number(drone.positionX), 2) +
        Math.pow(250000 - Number(drone.positionY), 2)
    )
    //console.log(Math.round(this.distance / 1000))
    return +(distance / 1000).toFixed(2)
  }

  ngOnDestroy(): void {
    // Unsubscribe from the source observable
    this.intervalSubscription.unsubscribe()
  }
}
