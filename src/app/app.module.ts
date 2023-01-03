import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { DronesComponent } from './components/drones/drones.component'

@NgModule({
  declarations: [AppComponent, DronesComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
