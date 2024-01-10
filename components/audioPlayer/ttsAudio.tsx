import { stripMarkdown } from '@/lib/markdown'
import { AudioPlayer } from '.'
import { tts } from '@/lib/tts'
import { base64ToBytes } from '@/utils/base64'

async function getDataByTTS(plainText: string) {
  // console.log('长度', plainText.length)
  if (plainText.length > 250) {
    return '暂不支持超过150个字符的文本，因为作者贫穷，开通长文本要给钱，白嫖很爽'
  }
  const audio = await tts(plainText)
  return audio
}

async function TTSAudioPlayer({ markdownText }: { markdownText: string }) {
  const plainMarkdownStr = (await stripMarkdown(markdownText)).replace(/\n/g, ' ')
  const audioFromTTS = await getDataByTTS(plainMarkdownStr)
  const audioURL = `data:audio/mp3;base64,${audioFromTTS}`
  // const bytes = base64ToBytes(audioFromTTS ?? '')
  // const blob = new Blob([bytes], { type: 'audio/mp3' })
  // console.log(blob)
  // const audioURL = URL.createObjectURL(blob)
  // console.log(audioURL)

  return (
    <div>
      <AudioPlayer track={audioURL} />
    </div>
  )
}

export default TTSAudioPlayer
