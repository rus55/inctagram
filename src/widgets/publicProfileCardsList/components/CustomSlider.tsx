import React, { useState } from 'react'

import s from './CustomSlider.module.scss'

export const CustomSlider = ({ children }: { children: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const slideNext = () => {
    setActiveIndex(val => {
      if (val >= children?.length - 1) {
        return 0
      } else {
        return val + 1
      }
    })
  }

  const slidePrev = () => {
    setActiveIndex(val => {
      if (val <= 0) {
        return children?.length - 1
      } else {
        return val - 1
      }
    })
  }

  return (
    <div className={s.containerSlider}>
      {children?.map((item: any, index: number) => {
        return (
          <div
            className={`${s.sliderItem} ${s['sliderItemActive-' + (activeIndex + 1)]}`}
            key={index}
          >
            {item}
          </div>
        )
      })}

      <div className={s.containerSliderLinks}>
        {children?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={
                activeIndex === index
                  ? `${s.containerSliderLinksSmall} ${s.containerSliderLinksSmallActive}`
                  : `${s.containerSliderLinksSmall}`
              }
              onClick={e => {
                e.preventDefault()
                setActiveIndex(index)
              }}
            ></div>
          )
        })}
      </div>

      <button
        className={s.sliderBtnNext}
        onClick={e => {
          e.preventDefault()
          slideNext()
        }}
      >
        {'>'}
      </button>
      <button
        className={s.sliderBtnPrev}
        onClick={e => {
          e.preventDefault()
          slidePrev()
        }}
      >
        {'<'}
      </button>
    </div>
  )
}
