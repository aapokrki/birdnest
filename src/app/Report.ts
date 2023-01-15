export interface Report {
  report: ReportClass
}

export interface ReportClass {
  deviceInformation: DeviceInformationClass
  capture: Capture
}

export interface Capture {
  $: CaptureClass
  drone: Drone[]
}

export interface CaptureClass {
  snapshotTimestamp: Date
}

export interface Drone {
  serialNumber: string
  model: string
  manufacturer: string
  mac: string
  ipv4: string
  ipv6: string
  firmware: string
  positionY: string
  positionX: string
  altitude: string
  distance: number
  date: Date
}

export interface DeviceInformationClass {
  $: DeviceInformation
  listenRange: string
  deviceStarted: Date
  uptimeSeconds: string
  updateIntervalMs: string
}

export interface DeviceInformation {
  deviceId: string
}
