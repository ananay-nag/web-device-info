import { writable } from "svelte/store";
import { getDeviceInfo, onDeviceChange } from "./core";
import type { IDeviceInfo, IDeviceOptions } from "./types";

export function useDeviceInfo(options: IDeviceOptions = {}) {
  const store = writable<IDeviceInfo>(getDeviceInfo(options));
  const stop = onDeviceChange((next) => store.set(next), options);

  return {
    subscribe: store.subscribe,
    destroy: () => stop()
  };
}

// export type { DeviceInfo, DeviceOptions } from "./types";
