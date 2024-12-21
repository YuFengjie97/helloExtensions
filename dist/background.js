var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class TabLife {
  constructor(hostname, start_time) {
    __publicField(this, "hostname");
    __publicField(this, "start_time");
    __publicField(this, "last_time");
    __publicField(this, "total_seconds", 0);
    this.hostname = hostname;
    this.start_time = start_time;
    this.last_time = start_time;
  }
  async update_last_time(time) {
    this.last_time = time;
    const milliseconds = this.last_time - this.start_time;
    this.total_seconds = milliseconds_to_seconds(milliseconds);
    await this.update_storage();
  }
  async get_storage_total_seconds() {
    const tab_life = await storage_get(this.hostname);
    if (tab_life === null) {
      return 0;
    }
    const { total_seconds } = tab_life;
    return total_seconds;
  }
  async update_storage() {
    const seconds = await this.get_storage_total_seconds();
    const seconds_update = seconds + this.total_seconds;
    storage_set(this.hostname, {
      hostname: this.hostname,
      last_time: this.last_time,
      total_seconds: seconds_update
    });
  }
}
async function storage_set(key, val) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: val }, () => resolve("success"));
  });
}
async function storage_get(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (res) => {
      if (Object.keys(res).length === 0) {
        resolve(null);
      } else {
        resolve(res[key]);
      }
    });
  });
}
function milliseconds_to_seconds(milliseconds) {
  return milliseconds / 1e3;
}
function parse_hostname(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname;
  } catch (e) {
    return "";
  }
}
function get_url_info() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let url = (tabs[0] && tabs[0].url) ?? "";
      const hostname = parse_hostname(url);
      resolve({ hostname, url });
    });
  });
}
const tab_map = {};
const host_map = {};
let tab_active = 0;
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  console.log("tab Active  ");
  const now = (/* @__PURE__ */ new Date()).getTime();
  const hostname_old = tab_map[tab_active];
  const tab_life = host_map[hostname_old];
  tab_life && tab_life.update_last_time(now);
  const { hostname } = await get_url_info();
  tab_map[tabId] = hostname;
  tab_active = tabId;
  if (hostname === "" || hostname === "newtab") return;
  if (!host_map[hostname]) {
    host_map[hostname] = new TabLife(hostname, now);
  }
  console.log(host_map);
});
chrome.tabs.onRemoved.addListener(async (tabId) => {
  console.log("tab Remove  ");
  delete tab_map[tabId];
  const { hostname } = await get_url_info();
  const now = (/* @__PURE__ */ new Date()).getTime();
  if (host_map[hostname]) {
    host_map[hostname].update_last_time(now);
  }
  console.log(host_map);
});
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    console.log("tab Update  ");
    const { hostname } = await get_url_info();
    const now = (/* @__PURE__ */ new Date()).getTime();
    if (hostname === "" || hostname === "newtab") return;
    if (!host_map[hostname]) {
      host_map[hostname] = new TabLife(hostname, now);
    } else {
      host_map[hostname].update_last_time(now);
    }
    console.log(host_map);
  }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  return void 0;
});
