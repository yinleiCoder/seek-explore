import dayjs, { Dayjs } from 'dayjs'

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
