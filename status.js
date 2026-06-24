export function summarizeStatus(payload) {
  if (!payload || !Array.isArray(payload.servers)) throw new Error("Invalid status response");
  const onlineServers = payload.servers.filter((server) => server.online === true || server.state === "READY");
  return { online: onlineServers.length > 0, players: onlineServers.reduce((sum, server) => sum + (Number(server.players) || 0), 0), serverCount: onlineServers.length };
}

export function formatDuration(milliseconds) {
  const seconds = Math.max(0, Math.floor(Number(milliseconds) / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ${minutes % 60}m`;
  return `${Math.floor(hours / 24)}d ${hours % 24}h`;
}

export function normalizeHistory(payload) {
  const downtimes = Array.isArray(payload?.downtimes) ? payload.downtimes : [];
  return downtimes.filter((item) => Number.isFinite(Number(item.start)) && Number.isFinite(Number(item.duration))).slice(0, 20);
}
