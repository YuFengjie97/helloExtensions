import { clear_storage, get_storage_all, get_url_info, TabLife } from "./utils";
import { type Message } from '../api/index'

// tabId --> hostname --> TabLife
const tab_map: {
  [tabId in number]: string
} = {}

const host_map: {
  [hostname in string]: TabLife
} = {}

let tab_active = 0

// 标签页激活,(新开空白页也会触发update)
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  console.log('tab Active  ');

  const now = new Date().getTime()

  // 更新旧TabLife
  const hostname_old = tab_map[tab_active]
  const tab_life = host_map[hostname_old]
  tab_life && tab_life.update_last_time(now)

  // 设置新TabLife
  const { hostname } = await get_url_info()
  tab_map[tabId] = hostname
  tab_active = tabId

  if (hostname === "" || hostname === 'newtab') return

  if (!host_map[hostname]) {
    host_map[hostname] = new TabLife(hostname, now)
  }
});

// 标签页关闭
chrome.tabs.onRemoved.addListener(async (tabId) => {
  console.log('tab Remove  ');
  delete tab_map[tabId]

  const { hostname } = await get_url_info()
  const now = new Date().getTime()

  if (host_map[hostname]) {
    host_map[hostname].update_last_time(now)
  }

  console.log(host_map);
});

// 标签页更新
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log('tab Update  ');

    const { hostname } = await get_url_info()
    const now = new Date().getTime()
    if (hostname === "" || hostname === 'newtab') return

    if (!host_map[hostname]) {
      host_map[hostname] = new TabLife(hostname, now)
    } else {
      host_map[hostname].update_last_time(now)
    }
  }
});


// 通信
/**
 * sendResponse ts 参数bug  https://github.com/GoogleChrome/chrome-types/issues/50
 */
chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  if (message.type === 'get_host_map') {
    sendResponse({ data: host_map })
  }

  if (message.type === "get_storage") {
    get_storage_all().then(res => {
      sendResponse({ data: res })
    })
  }

  if (message.type === "clear_storage") {
    clear_storage().then(res => {
      sendResponse({ data: "success" })
    })
  }

  return true
});