import { Component, Input } from '@angular/core'
import { Pilot } from 'src/app/Pilot'
import { PilotService } from 'src/app/services/pilot.service'

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css'],
})
export class PilotComponent {
  @Input() droneSN: string
  pilot: Pilot = {
    pilotId: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    createdDt: '',
    email: '',
  }

  constructor(private pilotService: PilotService) {}

  ngOnInit(): void {
    this.callPilot()
  }

  callPilot() {
    this.pilotService.getPilot(this.droneSN).subscribe(
      (res) => {
        this.pilot = res
      },
      (err) => {
        console.log('HTTP Error', err)

        // Default values for pilot if not found
        if (err.status == 404) {
          this.pilot = {
            pilotId: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            createdDt: '',
            email: '',
          }
          return
        }
        this.callPilot()
      }
    )
  }
}
