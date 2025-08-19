import type { IDeviceInfo, IDeviceOptions, IDeviceOrientation } from "./types";

function getDims(useViewport?: boolean) {
  if (typeof window === "undefined" || typeof screen === "undefined") {
    // SSR fallback
    return { width: 0, height: 0 };
  }
  const width = useViewport ? window.innerWidth : window.screen.width;
  const height = useViewport ? window.innerHeight : window.screen.height;
  return { width, height };
}

function getOrientation(): IDeviceOrientation {
  if (typeof window === "undefined") return "portrait"; // default
  return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
}

function classify(width: number) {
  const isMobile = width <= 767;
  const isTablet = width >= 768 && width <= 1024;
  const isDesktop = width > 1024;
  return { isMobile, isTablet, isDesktop };
}

export function getDeviceInfo(opts: IDeviceOptions = {}): IDeviceInfo {
  const { width, height } = getDims(opts.useViewport);

  const diagonal =
    width && height ? Math.sqrt(width ** 2 + height ** 2) / 96 : 0;

  return {
    ...classify(width),
    width,
    height,
    diagonal: Math.round(diagonal * 100) / 100,
    orientation: getOrientation(), // ✅ now works
    userAgent:
      typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
    platform: typeof navigator !== "undefined" ? navigator.platform : "unknown",
    language: typeof navigator !== "undefined" ? navigator.language : "en",
    online: typeof navigator !== "undefined" ? navigator.onLine : false,
  };
}

export function onDeviceChange(
  callback: (info: IDeviceInfo) => void,
  opts: IDeviceOptions = {}
): () => void {
  if (typeof window === "undefined") {
    // SSR no-op
    return () => {};
  }
  const handler = () => callback(getDeviceInfo(opts));

  // First fire
  handler();

  window.addEventListener("resize", handler, { passive: true });
  window.addEventListener("orientationchange", handler, { passive: true });
  window.addEventListener("online", handler);
  window.addEventListener("offline", handler);

  // (Optional) media-query listener helps some mobile browsers
  let mql: MediaQueryList | null = null;
  if ("matchMedia" in window) {
    mql = window.matchMedia("(orientation: portrait)");
    // modern addEventListener; fallback to onchange
    try {
      mql.addEventListener?.("change", handler);
    } catch {
      // older Safari
      // @ts-ignore
      mql.addListener?.(handler);
    }
  }

  return () => {
    window.removeEventListener("resize", handler);
    window.removeEventListener("orientationchange", handler);
    window.addEventListener("online", handler);
    window.addEventListener("offline", handler);
    if (mql) {
      try {
        mql.removeEventListener?.("change", handler);
      } catch {
        // @ts-ignore
        mql.removeListener?.(handler);
      }
    }
  };
}

export type { IDeviceInfo, IDeviceOptions } from "./types";
