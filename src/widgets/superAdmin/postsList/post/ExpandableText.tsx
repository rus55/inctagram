import React from 'react'

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
          {isExpanded ? 'hide' : 'show all'}
        </button>
      )}
    </>
  )
}

export default ExpandableText
