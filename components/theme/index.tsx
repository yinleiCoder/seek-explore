'use client'

import Button from '../button'
import { MdDarkMode } from 'react-icons/md'
import { IoSunny } from 'react-icons/io5'
import { useAppContext } from '@/context/appContext'
import { THEME_DARK, THEME_LIGHT } from '@/constants/theme'
import { ActionType } from '@/reducers/AppReducer'

// 主题切换
export default function Theme() {
  const {
    state: { themeMode },
    dispatch,
  } = useAppContext()

  return (
    <Button
      icon={themeMode === THEME_DARK ? MdDarkMode : IoSunny}
      onClick={() => {
        dispatch({
          type: ActionType.UPDATE,
          field: 'themeMode',
          value: themeMode === THEME_DARK ? THEME_LIGHT : THEME_DARK,
        })
      }}
    />
  )
}
