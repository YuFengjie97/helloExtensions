interface TabLifeStorage {
  hostname: string
  last_time: number
  total_seconds: number
}

export class TabLife {
  hostname: string
  start_time: number
  last_time: number
  total_seconds = 0

  constructor(hostname: string, start_time: number) {
    this.hostname = hostname
    this.start_time = start_time
    this.last_time = start_time
  }

  async update_last_time(time: number) {
    this.last_time = time
    const milliseconds = this.last_time - this.start_time
    this.total_seconds = milliseconds_to_seconds(milliseconds)
    await this.update_storage()
  }

  async get_storage_total_seconds(): Promise<number> {
    const tab_life = await storage_get<TabLifeStorage>(this.hostname)
    if (tab_life === null) {
      return 0
    }
    const { total_seconds } = tab_life
    return total_seconds
  }

  async update_storage() {
    const seconds = await this.get_storage_total_seconds()
    const seconds_update = seconds + this.total_seconds
    storage_set<TabLifeStorage>(this.hostname, {
      hostname: this.hostname,
      last_time: this.last_time,
      total_seconds: seconds_update
    })
  }
}

async function storage_set<T>(key: string, val: T) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: val }, () => resolve('success'));
  })
}
async function storage_get<T>(key: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (res) => {
      if (Object.keys(res).length === 0) {
        resolve(null)
      } else {
        resolve(res[key])
      }
    });
  })
}

export function milliseconds_to_seconds(milliseconds: number) {
  return milliseconds / 1000;
}


export function parse_hostname(url: string): string {
  try {
    const hostname = new URL(url).hostname
    return hostname
  } catch (e) {
    return ''
  }
}

export function get_url_info(): Promise<{
  hostname: string
  url: string,
}> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let url = (tabs[0] && tabs[0].url) ?? ''
      const hostname = parse_hostname(url)
      resolve({ hostname, url })
    });
  })
}