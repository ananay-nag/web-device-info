import { useEffect, useState } from "react";
import { getDeviceInfo, onDeviceChange } from "./core";
import type { IDeviceInfo, IDeviceOptions } from "./types";

export function useDeviceInfo(options: IDeviceOptions = {}): IDeviceInfo {
  const [info, setInfo] = useState<IDeviceInfo>(() => getDeviceInfo(options));

  useEffect(() => {
    const stop = onDeviceChange(setInfo, options);
    return () => stop();
    // only resubscribe when the mode changes
  }, [options.useViewport]);

  return info;
}

// export type { DeviceInfo, DeviceOptions } from "./types";
