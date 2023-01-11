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

@Component({
  selector: 'app-drones',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  droneReports: Report[] = []
  droneList: Drone[] = []
  intervalPeriod: number = 2000
  radiusNDZ: number = 100
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

  // TODO: get interval and area data from api
  ngOnInit(): void {
    // Subscribe to the source observable and parse the XML
    this.startApiCalls()
  }

  startApiCalls() {
    this.intervalSubscription = this.source.subscribe(
      (res) => {
        console.log('HTTP response')
        this.parser.parseString(res, (err, result: Report) => {
          this.droneReports.push(result)
          //console.log(this.droneReports)
          this.addToDroneList(result)
        })
      },
      (err) => {
        console.log('HTTP Error', err)
        this.intervalSubscription.unsubscribe()

        setTimeout(() => {
          this.startApiCalls()
        }, 60000)
      },
      () => {
        console.log('HTTP request completed.')
      }
    )
  }

  // Add drones to the list if they are in the NDZ
  addToDroneList(report: Report) {
    report.report.capture.drone.forEach((drone) => {
      var dist = this.getDistanceFromNest(drone)
      if (dist <= this.radiusNDZ) {
        // Add the distance from the nest to the drone object and update list
        drone.distance = dist
        this.updateDroneList(drone)
      }
    })
  }

  // Add a drone to the list if it is not already there,
  // otherwise update the position if it is closer than before
  updateDroneList(drone: Drone) {
    var d = this.droneList.find((d) => d.serialNumber === drone.serialNumber)
    if (d === undefined) {
      this.droneList.push(drone)
    } else {
      // Update the position of the drone in the list
      if (d.distance > drone.distance) {
        console.log(
          `${drone.serialNumber.slice()} ${d.distance} -> ${drone.distance}`
        )
        d.positionX = drone.positionX
        d.positionY = drone.positionY
        d.distance = drone.distance

        // Sort the list by distance from the nest
        this.droneList.sort((a, b) => a.distance - b.distance)
      }
    }
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
