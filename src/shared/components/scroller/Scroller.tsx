import { ReactNode } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'

import s from './Scroller.module.scss'

import { cn } from '@/shared/lib/utils'

export type ScrollerOrientation = 'vertical' | 'horizontal'

export type ScrollerProps = Readonly<{
  orientation?: ScrollerOrientation
  children: ReactNode
  customHeight?: string
  customWidth?: string
  className?: string
}>

export const Scroller = (props: ScrollerProps) => {
  return (
    <ScrollArea.Root
      scrollHideDelay={100_000}
      className={cn(s.scrollAreaRoot, props.className)}
      style={{
        height: props.customHeight,
        width: props.customWidth,
      }}
    >
      <ScrollArea.Viewport className={cn(s.scrollAreaViewport, props.className)}>
        <div className={props.className}>{props.children}</div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={s.scrollAreaScrollbar} orientation="vertical">
        <ScrollArea.Thumb className={s.scrollAreaThumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar className={s.scrollAreaScrollbar} orientation="horizontal">
        <ScrollArea.Thumb className={s.scrollAreaThumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={s.scrollAreaCorner} />
    </ScrollArea.Root>
  )
}
