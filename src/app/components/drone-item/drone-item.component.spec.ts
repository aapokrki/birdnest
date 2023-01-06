import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DroneItemComponent } from './drone-item.component'

describe('DroneComponent', () => {
  let component: DroneItemComponent
  let fixture: ComponentFixture<DroneItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DroneItemComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DroneItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
