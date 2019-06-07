import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from '../providers/electron.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  devicesList;

  constructor(
    private electronService: ElectronService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.electronService.ipcRenderer.on('deviceData', (event, devices) => {
      console.log(event);
      console.log(devices);
      this.devicesList = devices;
      this.changeDetectorRef.detectChanges();
    });
  }

  export() {
    this.electronService.ipcRenderer.send('triggerToStore', this.devicesList);
  }
}
