export type IDeviceOrientation = "portrait" | "landscape";

export type IDeviceInfo = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  diagonal: number; // inches (approx)
  orientation?: IDeviceOrientation;
  userAgent?: string;
  platform?: string;
  language?: string;
  online?: boolean;
};

export interface IDeviceOptions {
  /**
   * Use viewport (innerWidth / innerHeight) instead of screen.*.
   * Recommended for responsive testing (e.g., Chrome devtools).
   */
  useViewport?: boolean;
}
