import { useEffect, useState } from 'react'

export const useVisibleItems = (items: MessagesNotif[], toggle: boolean) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const itemId = Number(entry.target.getAttribute('data-id'))

            setVisibleItems(prevVisibleItems => {
              if (!prevVisibleItems.includes(itemId)) {
                return [...prevVisibleItems, itemId]
              }

              return prevVisibleItems
            })
          }
        })
      },
      {
        threshold: 0.1,
      }
    )

    const elements = document.querySelectorAll('[data-id]')

    elements.forEach(element => observer.observe(element))

    return () => {
      elements.forEach(element => observer.unobserve(element))
    }
  }, [items])

  return toggle ? visibleItems : []
}
