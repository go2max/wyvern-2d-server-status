# Wyvern Live Server Status — GhostTrack

A lightweight, fully static single-page website to display the **online/offline status** of the Wyvern game server. Built with HTML, TailwindCSS, and vanilla JavaScript, this page is optimized for hosting on **GitHub Pages** or any static hosting service.

**Features:**
- Live server status indicator: green for online, red for offline.  
- Flashing animation on each status check.  
- Seconds since last update counter.  
- Player count placeholder (`—`) to avoid server load.  
- Steam launch button to open Wyvern directly from the page.  
- Downtime history: displays last 5 downtimes with timestamp, server IP, and duration.  
- Fully self-contained, runs entirely in the browser — no server-side code required.  
- Uses a Cloudflare Worker (or any HTTP proxy) to safely ping server IPs.

**How It Works:**
- The page polls a Worker endpoint every 10 seconds to check server reachability.  
- The status dot flashes briefly during each poll.  
- The last update timer increments every second.  
- Downtime history is updated automatically:
  - Records timestamp when a server goes offline.  
  - Captures first responsive server IP.  
  - Calculates duration until the server comes back online.  
- The Steam launch button uses the protocol `steam://rungameid/1541710` to open the game if installed.

**Technical Note:** Direct TCP connections to Wyvern servers are not possible from the browser due to security restrictions. A Worker endpoint or proxy is required to check server IP reachability and expose results via HTTP/JSON.

**Worker Endpoint:**
- Handles checking a list of server IPs (e.g., `34.172.110.16`, `34.29.57.69`, `34.101.23.45`).  
- Returns JSON indicating which IPs are online.  
- Responds quickly to prevent browser blocking.  

Example Worker URL:  
https://wyvern-server-status.williamuland12.workers.dev/


**Example JSON response:**
json
[
  { "ip": "34.172.110.16", "online": true },
  { "ip": "34.29.57.69", "online": false },
  { "ip": "34.101.23.45", "online": true }
]

**Usage:**

Clone or download this repository.

Open index.html in a browser or deploy to GitHub Pages.

Ensure your Worker endpoint is live and accessible. Update the URL in the <script> section if needed.

Optional: Update the Steam App ID in the <script> section if Wyvern’s App ID changes:

window.location.href = "steam://rungameid/1541710";

**Downtime History:**

Displays the last 5 downtime events.

Shows start time, duration in seconds, and server IP for each event.

Automatically updated when a server goes offline and comes back online.

Helps identify recurring outages or unstable servers.

**Customization:**

Polling interval: modify the POLL_INTERVAL constant in the script (default 10000 ms).

Server IPs: update the Worker endpoint to check additional IPs.

UI styling: customize TailwindCSS classes in index.html.

Downtime history length: adjust the array size in the script logic to track more or fewer events.

License: MIT License — free to use, modify, and distribute with proper attribution.