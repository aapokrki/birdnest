import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { ReportsComponent } from './components/reports/reports.component'
import { DroneItemComponent } from './components/drone-item/drone-item.component';
import { PilotComponent } from './components/pilot/pilot.component'

@NgModule({
  declarations: [AppComponent, ReportsComponent, DroneItemComponent, PilotComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
