import assert from "node:assert/strict"; import test from "node:test"; import { formatDuration, normalizeHistory, summarizeStatus } from "../status.js";
test("summarizes responsive servers",()=>assert.deepEqual(summarizeStatus({servers:[{online:true,players:3},{state:"READY",players:2},{online:false,players:9}]}),{online:true,players:5,serverCount:2}));
test("rejects malformed status",()=>assert.throws(()=>summarizeStatus({}),/Invalid/));
test("formats durations",()=>{assert.equal(formatDuration(1500),"1s");assert.equal(formatDuration(3660000),"1h 1m")});
test("normalizes history",()=>assert.equal(normalizeHistory({downtimes:[{start:1,duration:2},{nope:true}]}).length,1));
