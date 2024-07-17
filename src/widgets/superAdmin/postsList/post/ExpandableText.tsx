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
  textRef: React.RefObject<HTMLDivElement>
  expanded: { [key: number]: boolean }
  toggleExpand: (id: number) => void
  maxLength: number
  text: string
  id: number
}

export function ExpandableText({ textRef, maxLength, text, id, expanded, toggleExpand }: Props) {
  const displayText =
    !expanded[id] && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text

  return (
    <>
      <span
        ref={textRef}
        style={{ ...styles.text, wordWrap: text.length > maxLength ? 'break-word' : undefined }}
      >
        {displayText}
      </span>
      {text.length > maxLength && (
        <button onClick={() => toggleExpand(id)} style={styles.button}>
          {expanded[id] ? 'hide' : 'show all'}
        </button>
      )}
    </>
  )
}
