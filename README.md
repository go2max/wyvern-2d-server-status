# Wyvern Live Server Status — GhostTrack

A lightweight, fully static single-page website to display the **online/offline status** of the Wyvern game server. Built with HTML, TailwindCSS, and vanilla JavaScript, this page is optimized for hosting on **GitHub Pages**.

---

## Features

- **Live server status indicator**: green for online, red for offline.  
- **Flashing animation** on each status check to show activity.  
- **Seconds since last update** counter.  
- **Player count placeholder** (`—`) to avoid server load.  
- **Steam launch button** to open Wyvern directly from the page.  
- Fully **self-contained**, runs entirely in the browser — no server-side code required.

---

## How It Works

1. The page polls a server status API (or simulates it if no API is available) every **10 seconds**.  
2. The status dot flashes briefly during each poll.  
3. The **last update timer** increments every second.  
4. The Steam launch button uses the protocol `steam://rungameid/1541710` to open the game if installed.

> ⚠️ **Important:** Direct TCP connection to the Wyvern server is not possible from the browser due to web security restrictions. To fetch real-time data, you need a small **HTTP proxy server** that connects to Wyvern and exposes JSON.

---

## Usage

1. Clone or download this repository.  
2. Open `index.html` in a browser or deploy it to **GitHub Pages**.  
3. Optional: Update the Steam App ID in the `<script>` section if Wyvern’s App ID changes:

```javascript
window.location.href = "steam://rungameid/1541710";
