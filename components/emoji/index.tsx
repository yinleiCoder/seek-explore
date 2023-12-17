'use client'

import data, { Emoji } from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Button from '../button'
import clsx from 'clsx'
import { AiTwotoneSmile } from 'react-icons/ai'
import { useState } from 'react'

export default function Emoji({ onSelect }: { onSelect: Function }) {
  const [isPickerVisible, setPickerVisible] = useState(false)
  return (
    <div>
      <Button
        icon={AiTwotoneSmile}
        className="hover:bg-zinc-200"
        iconClassName="text-xl"
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          setPickerVisible(!isPickerVisible)
        }}
      />
      <div
        className={clsx('', {
          'hidden duration-300': !isPickerVisible,
          'block duration-300': isPickerVisible,
        })}
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: EmojiPickerProp, event: PointerEvent) => {
            console.log(emoji)
            event.stopPropagation()
            onSelect(emoji.native)
            setPickerVisible(!isPickerVisible)
          }}
        />
      </div>
    </div>
  )
}
