import IORedis, { Redis } from 'ioredis'

// https://github.com/redis/ioredis
function fixUrl(url: string) {
  if (!url) {
    return ''
  }
  if (url.startsWith('redis://') && !url.startsWith('redis://:')) {
    return url.replace('redis://', 'redis://:')
  }
  if (url.startsWith('rediss://') && !url.startsWith('rediss://:')) {
    return url.replace('rediss://', 'rediss://:')
  }
  return url
}

// 封装redis客户端单例模式
class ClientRedis {
  static instance: Redis

  constructor() {
    throw new Error('Use Singleton.getInstance()')
  }

  static getInstance(): Redis | null {
    if (!ClientRedis.instance) {
      ClientRedis.instance = new IORedis(fixUrl(process.env.REDIS_URL!))
    }
    return ClientRedis.instance
  }
}

export default ClientRedis.getInstance()
