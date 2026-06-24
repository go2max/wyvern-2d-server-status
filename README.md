# Wyvern Server Status

A dependency-free community status page for Wyvern. It polls the existing monitor with an eight-second timeout, distinguishes monitor failures from confirmed game downtime, reports player totals, shows recent downtime, and supports manual refresh.

Serve the directory with any static host. Run `npm test` and `npm run check` before deployment. The Worker endpoint remains the authoritative runtime dependency.
