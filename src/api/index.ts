import { TabLife } from "../background/utils";

export interface Message {
  type: string,
  preload?: any
}

export function send_message(message: Message): Promise<{ data: TabLife }> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (res: any) => {
      if (chrome.runtime.lastError) {
        console.error(`EORROR  ${message.type}`, chrome.runtime.lastError.message);
        reject(new Error(chrome.runtime.lastError.message));
      }
      else {
        resolve(res);
      }
    });
  })
}


export function get_host_map() {
  return send_message({ type: 'get_host_map' })
}

export function get_storage()  {
  return send_message({ type: 'get_storage' })
}

export function clear_storage() {
  return send_message({ type: 'clear_storage' })
}