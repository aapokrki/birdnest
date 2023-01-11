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
}
