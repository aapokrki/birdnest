import { Component, Input } from '@angular/core'
import { Drone } from 'src/app/Report'
@Component({
  selector: 'app-drone',
  templateUrl: './drone-item.component.html',
  styleUrls: ['./drone-item.component.css'],
})
export class DroneItemComponent {
  @Input() drone: Drone
  distance: number = 0

  isInArea() {
    this.distance = Math.sqrt(
      Math.pow(250000 - Number(this.drone.positionX), 2) +
        Math.pow(250000 - Number(this.drone.positionY), 2)
    )

    console.log(Math.round(this.distance / 1000))

    return this.distance < 100000 ? true : false
  }
}
