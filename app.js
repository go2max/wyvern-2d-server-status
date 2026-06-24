import { formatDuration, normalizeHistory, summarizeStatus } from "./status.js";

const WORKER_URL = "https://wyvern-server-status.williamuland12.workers.dev";
const statusEl = document.querySelector("#status");
const playersEl = document.querySelector("#players");
const updatedEl = document.querySelector("#updated");
const historyEl = document.querySelector("#history");
const refreshButton = document.querySelector("#refresh");
let lastUpdated = null;

async function fetchJson(path = "") {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${WORKER_URL}${path}`, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error(`Status service returned ${response.status}`);
    return await response.json();
  } finally { clearTimeout(timeout); }
}

async function refresh() {
  refreshButton.disabled = true;
  statusEl.dataset.state = "checking";
  statusEl.textContent = "Checking";
  try {
    const [statusPayload, historyPayload] = await Promise.all([fetchJson(), fetchJson("/downtimes")]);
    const result = summarizeStatus(statusPayload);
    statusEl.dataset.state = result.online ? "online" : "offline";
    statusEl.textContent = result.online ? "Online" : "Offline";
    playersEl.textContent = result.online ? `${result.players} players across ${result.serverCount} server${result.serverCount === 1 ? "" : "s"}` : "No responsive game servers";
    const history = normalizeHistory(historyPayload);
    historyEl.replaceChildren(...(history.length ? history.map((item) => {
      const li = document.createElement("li");
      li.textContent = `${new Date(Number(item.start)).toLocaleString()} - ${formatDuration(item.duration)}`;
      return li;
    }) : [Object.assign(document.createElement("li"), { textContent: "No downtime recorded in the current window." })]));
    lastUpdated = Date.now();
  } catch (error) {
    statusEl.dataset.state = "unknown";
    statusEl.textContent = "Status unavailable";
    playersEl.textContent = error.name === "AbortError" ? "The status request timed out." : "The monitor could not be reached. This does not mean the game is offline.";
  } finally { refreshButton.disabled = false; }
}

setInterval(() => { updatedEl.textContent = lastUpdated ? `Updated ${Math.floor((Date.now() - lastUpdated) / 1000)}s ago` : "Not updated yet"; }, 1000);
refreshButton.addEventListener("click", refresh);
document.querySelector("#steam").addEventListener("click", () => { window.location.href = "steam://rungameid/1541710"; });
refresh();
setInterval(refresh, 30000);
