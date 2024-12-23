import { g as get_host_map, a as get_storage, c as clear_storage } from "./assets/index-XiIpHlBy.js";
const bt_go_chart = document.querySelector("#go_chart");
bt_go_chart == null ? void 0 : bt_go_chart.addEventListener("click", () => {
  const url = chrome.runtime.getURL(`/html/chart.html`);
  chrome.tabs.create({ url }, (tab) => {
    console.log("New tab opened:", tab);
  });
});
const bt_log_host_map = document.querySelector("#log_host_map");
bt_log_host_map == null ? void 0 : bt_log_host_map.addEventListener("click", async () => {
  const res = await get_host_map();
  console.log("host_map", res);
});
const bt_log_storage = document.querySelector("#log_storage");
bt_log_storage == null ? void 0 : bt_log_storage.addEventListener("click", async () => {
  const res = await get_storage();
  console.log("log_storage", res);
});
const bt_clear_storage = document.querySelector("#clear_storage");
bt_clear_storage == null ? void 0 : bt_clear_storage.addEventListener("click", async () => {
  const res = await clear_storage();
  console.log("clear_storage", res);
});
