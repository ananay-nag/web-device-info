import { shallowRef, onMounted, onUnmounted, type Ref } from "vue";
import { getDeviceInfo, onDeviceChange } from "./core";
import type { IDeviceInfo, IDeviceOptions } from "./types";

export function useDeviceInfo(options: IDeviceOptions = {}): Ref<IDeviceInfo> {
  const info = shallowRef<IDeviceInfo>(getDeviceInfo(options));
  let stop: (() => void) | null = null;

  onMounted(() => {
    stop = onDeviceChange((next) => (info.value = next), options);
  });

  onUnmounted(() => stop?.());

  return info;
}

// export type { DeviceInfo, DeviceOptions } from "./types";
