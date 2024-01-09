import * as React from 'react'

export const RotateIcon = ({ size = 24, color = '#fff', ...props }) => {
  return (
    <svg viewBox="0 0 24 24" fill={color} height={size} width={size} {...props}>
      <path d="M7.47 21.5C4.2 19.93 1.86 16.76 1.5 13H0c.5 6.16 5.66 11 11.95 11 .23 0 .44 0 .66-.03L8.8 20.15 7.47 21.5M12.05 0c-.23 0-.44 0-.66.04l3.81 3.81 1.33-1.35c3.27 1.57 5.61 4.74 5.97 8.5H24c-.5-6.16-5.66-11-11.95-11M16 14h2V8a2 2 0 00-2-2h-6v2h6v6m-8 2V4H6v2H4v2h2v8a2 2 0 002 2h8v2h2v-2h2v-2H8z" />
    </svg>
  )
}