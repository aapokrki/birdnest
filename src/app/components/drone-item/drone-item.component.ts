import { formatDate } from '@angular/common'
import { Component, Input } from '@angular/core'
import { Drone } from 'src/app/Report'
@Component({
  selector: 'app-drone',
  templateUrl: './drone-item.component.html',
  styleUrls: ['./drone-item.component.css'],
})
export class DroneItemComponent {
  @Input() drone: Drone

  constructor() {}

  getDateShortFormat() {
    return formatDate(this.drone.date, 'HH:mm:ss (dd.MM.yyyy)', 'en-US')
  }
}
