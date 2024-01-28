import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { v4 as uuidv4 } from 'uuid'

const TTSClient = tencentcloud.tts.v20190823.Client

const clientConfig = {
  credential: {
    secretId: process.env.TENCENT_SECRETID,
    secretKey: process.env.TENCENT_SECRETKEY,
  },
  region: 'ap-chengdu',
  profile: {
    // signMethod: 'TC3-HMAC-SHA256',
    httpProfile: {
      endpoint: 'tts.tencentcloudapi.com',
      // reqMethod: 'POST', // 请求方法
      // reqTimeout: 30, // 请求超时时间，默认60s
    },
  },
}

const ttsClient = new TTSClient(clientConfig)

async function tts(text: string) {
  const req = {
    Text: text,
    SessionId: uuidv4(),
    VoiceType: 1010, // 智华的音色
  }
  try {
    return (await ttsClient.TextToVoice(req)).Audio
  } catch (err) {
    console.log(err)
  }
  return null
}

export { tts }
