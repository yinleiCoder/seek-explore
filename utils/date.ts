import dayjs, { Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(duration)
dayjs.extend(relativeTime)

export const dateFormat = (
  date: string | number | Date | Dayjs,
  format = 'YYYY年MM月DD日 HH:mm:ss'
) => {
  return dayjs(date).format(format)
}

export const dateDiff = (
  date1: string | number | Date | Dayjs,
  date2: string | number | Date | Dayjs
) => {
  return dayjs(date1).diff(date2, 'second')
}

export const dateRelativeTime = (date: string | number | Date | Dayjs) => {
  const now = dayjs()
  const diffInMilliseconds = now.diff(date)
  return dayjs.duration(diffInMilliseconds).humanize(true)
}
