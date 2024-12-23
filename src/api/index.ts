export interface Message {
  type: string,
  preload?: any
}

export function send_message(message: Message) {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    chrome.runtime.sendMessage(message, (res: any) => {
      //@ts-ignore
      if(chrome.runtime.lastError){
        //@ts-ignore
        console.error(`EORROR  ${message.type}`, chrome.runtime.lastError.message);
        //@ts-ignore
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

export function get_storage() {
  return send_message({ type: 'get_storage' })
}

export function clear_storage() {
  return send_message({ type: 'clear_storage' })
}