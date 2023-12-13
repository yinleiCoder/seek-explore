import dayjs, { Dayjs } from 'dayjs'

export const dateFormat = (
  date: string | number | Date | Dayjs,
  format = 'YYYY年MM月DD日 HH:mm:ss'
) => {
  return dayjs(date).format(format)
}
