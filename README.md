
# 🌐 web-device-info ![Version](https://img.shields.io/badge/version-1.0.0-green)


**Universal Web Device Information Library** – works for **JS, React, Angular, Vue3, Svelte**.  
Detect **screen size, orientation, diagonal, platform, language, online status** in real-time across all major frameworks.

---

## 🚀 Features

- ✅ Multi-framework support: React, Angular, Vue3, Svelte, Vanilla JS, Common JS 
- ✅ Real-time updates on resize, orientation, and online/offline changes  
- ✅ Screen width, height, and approximate diagonal size (inches)  
- ✅ Orientation detection: portrait / landscape  
- ✅ User agent, platform, language detection  
- ✅ TypeScript ready, fully typed  
- ✅ Tiny & dependency-free (~10 KB)  
- ✅ Hooks / composables for modern frameworks  

---

## Version 
### **Version:** 
- latest : [ ![Version](https://img.shields.io/badge/version-1.0.0-green)](./version-1-0-0.md) 
- v1.0.0 : [ ![Version](https://img.shields.io/badge/version-1.0.0-blue)](./version-1-0-0.md)

## 📦 Installation

```bash
# npm
npm install @ananay-nag/web-device-info

# yarn
yarn add @ananay-nag/web-device-info

# pnpm
pnpm add @ananay-nag/web-device-info

```

## 🛠 Usage Examples

### 1️⃣ React

``` typescript
import React from "react";
import { ReactDeviceInfo } from "@ananay-nag/web-device-info";

const { useDeviceInfo } = ReactDeviceInfo;

export default function App() {
  const deviceInfo = useDeviceInfo({ useViewport: true });

  return (
    <div>
      <h1>React Device Info</h1>
      <pre>{JSON.stringify(deviceInfo, null, 2)}</pre>
    </div>
  );
}

```

### 2️⃣ Angular

``` typescript
import { Component, OnInit } from "@angular/core";
import { AngularDeviceInfo } from "@ananay-nag/web-device-info";

@Component({
  selector: "app-root",
  template: `
    <h1>Angular Device Info</h1>
    <pre>{{ deviceInfo | json }}</pre>
  `
})
export class AppComponent implements OnInit {
  deviceInfo: any;

  ngOnInit() {
    this.deviceInfo = AngularDeviceInfo.getDeviceInfo({ useViewport: true });
  }
}

```

### 3️⃣ Vue 3

``` javascript
<script setup lang="ts">
import { VueDeviceInfo } from "@ananay-nag/web-device-info";

const { useDeviceInfo } = VueDeviceInfo;
const deviceInfo = useDeviceInfo({ useViewport: true });
</script>

<template>
  <h1>Vue 3 Device Info</h1>
  <pre>{{ deviceInfo }}</pre>
</template>
```

### 4️⃣ Svelte

``` javascript
<script lang="ts">
  import { SvelteDeviceInfo } from "@ananay-nag/web-device-info";
  const { deviceInfo } = SvelteDeviceInfo.useDeviceInfo({ useViewport: true });
</script>

<h1>Svelte Device Info</h1>
<pre>{JSON.stringify($deviceInfo, null, 2)}</pre>
```

### 5️⃣ Vanilla JS
``` javascript
import { JSDeviceInfo } from "@ananay-nag/web-device-info";

const { getDeviceInfo } = JSDeviceInfo;
console.log("Device Info:", getDeviceInfo({ useViewport: true }));

```

## 📋 API Reference

### DeviceOptions

| Option        | Type    | Default | Description                                                                  |
| ------------- | ------- | ------- | ---------------------------------------------------------------------------- |
| `useViewport` | boolean | false   | Use `window.innerWidth/innerHeight` instead of `screen.width/screen.height`. |

### DeviceInfo
| Field         | Type                      | Description                      |
| ------------- | ------------------------- | -------------------------------- |
| `width`       | number                    | Screen width in pixels           |
| `height`      | number                    | Screen height in pixels          |
| `diagonal`    | number                    | Approximate diagonal in inches   |
| `orientation` | "portrait" \| "landscape" | Screen orientation               |
| `userAgent`   | string                    | Browser user agent               |
| `platform`    | string                    | Platform (e.g., Win32, MacIntel) |
| `language`    | string                    | Browser language                 |
| `online`      | boolean                   | Online/offline status            |


### Exports
``` Typescript
import {
  IDeviceInfo,
  IDeviceOptions,
  getDeviceInfo,   // Core JS API
  onDeviceChange,  // Listen to resize/orientation changes
  ReactDeviceInfo, // React hook
  AngularDeviceInfo,
  VueDeviceInfo,
  SvelteDeviceInfo,
  JSDeviceInfo
} from "@ananay-nag/web-device-info";

```

### 🔄 Orientation Change Example
``` typescript
import { onDeviceChange } from "@ananay-nag/web-device-info";

onDeviceChange((info) => {
  console.log("Device changed:", info.orientation, info.width, info.height);
});

```

## 💡 Advantages Compared to Other Packages
| Feature / Package                  | web-device-info | react-device-detect | ua-parser-js | detect.js |
| ---------------------------------- | --------------- | ------------------- | ------------ | --------- |
| Multi-framework support            | ✅               | ❌                   | ❌            | ❌         |
| Real-time updates                  | ✅               | ❌                   | ❌            | ❌         |
| Screen dimensions (width & height) | ✅               | ✅                   | ✅            | ✅         |
| Screen diagonal size               | ✅               | ❌                   | ❌            | ❌         |
| Orientation detection              | ✅               | ❌                   | ❌            | ❌         |
| Online/offline status              | ✅               | ❌                   | ❌            | ❌         |
| TypeScript ready                   | ✅               | ✅                   | ✅            | ❌         |
| Tiny & dependency-free             | ✅               | ❌                   | ❌            | ❌         |
| Hooks / composables                | ✅               | ✅                   | ❌            | ❌         |
| Vanilla JS support                 | ✅               | ❌                   | ✅            | ✅         |

### Key Advantages:

- One library for all major frameworks

- Automatically updates on screen, orientation, and online status changes

- sreen diagonal calculation — unique among similar libraries

- Minimal bundle size for production apps

- Fully TypeScript ready

- Unified API across frameworks

## 📜 License

MIT © 2025 – Open Source ❤️