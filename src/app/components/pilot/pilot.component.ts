import { Component, Input } from '@angular/core'
import { Pilot } from 'src/app/Pilot'
import { Drone } from 'src/app/Report'
import { PilotService } from 'src/app/services/pilot.service'

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css'],
})
export class PilotComponent {
  @Input() drone: Drone
  pilot: Pilot

  constructor(private pilotService: PilotService) {}

  ngOnInit(): void {
    console.log(this.drone.serialNumber)
    this.pilotService.getPilot(this.drone.serialNumber).subscribe((data) => {
      this.pilot = data
      console.log(this.pilot.firstName)
    })
  }
}
