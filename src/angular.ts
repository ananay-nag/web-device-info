import { Injectable, NgZone, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { getDeviceInfo, onDeviceChange } from "./core";
import type { IDeviceInfo, IDeviceOptions } from "./types";

@Injectable({ providedIn: "root" })
export class DeviceService implements OnDestroy {
  private subject = new BehaviorSubject<IDeviceInfo>(getDeviceInfo());
  readonly info$: Observable<IDeviceInfo> = this.subject.asObservable();

  private stop: (() => void) | null = null;

  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      this.stop = onDeviceChange((info) => {
        this.zone.run(() => this.subject.next(info));
      });
    });
  }

  /** Switch between viewport vs screen mode at runtime if needed */
  setOptions(options: IDeviceOptions) {
    this.stop?.();
    this.zone.runOutsideAngular(() => {
      this.stop = onDeviceChange((info) => {
        this.zone.run(() => this.subject.next(info));
      }, options);
    });
  }

  ngOnDestroy(): void {
    this.stop?.();
    this.subject.complete();
  }
}

// export type { DeviceInfo, DeviceOptions } from "./types";
