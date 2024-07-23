import React from 'react'

import { useTranslation } from '@/shared/lib'

const styles = {
  button: {
    cursor: 'pointer',
    color: 'blue',
    textDecoration: 'underline',
  },
  text: {
    marginRight: '5px',
  },
}

type Props = {
  isExpanded: boolean
  setIsExpanded: (value: boolean) => void
  maxLength: number
  text: string
}

function ExpandableText({ maxLength, text, isExpanded, setIsExpanded }: Props) {
  const { t } = useTranslation()
  const displayText =
    !isExpanded && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text

  return (
    <>
      <span
        style={{ ...styles.text, wordWrap: text.length > maxLength ? 'break-word' : undefined }}
      >
        {displayText}
      </span>
      {text.length > maxLength && (
        <button onClick={() => setIsExpanded(!isExpanded)} style={styles.button}>
          {isExpanded ? t.hide : t.show_more}
        </button>
      )}
    </>
  )
}

export default ExpandableText
