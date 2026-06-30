const NOTE_TILTS = [-1.1, 0.7, -0.5, 0.9, -0.7, 0.4]

export default function BookStickyNote({
  title,
  icon,
  summary,
  tilt = -2.4,
  compact = false,
  selected = false,
  noteId = '',
  onClick = null,
  buttonRef = null,
}) {
  const className = [
    'book-sticky-note',
    compact ? 'book-sticky-note--pick' : '',
    selected ? 'book-sticky-note--selected' : '',
    noteId ? `book-sticky-note--${noteId}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span className="book-sticky-note__tape book-sticky-note__tape--left" aria-hidden="true" />
      <span className="book-sticky-note__tape book-sticky-note__tape--right" aria-hidden="true" />

      <div className="book-sticky-note__paper">
        {icon && <div className="book-sticky-note__icon">{icon}</div>}
        <p className="book-sticky-note__title">{title}</p>
        {summary && <p className="book-sticky-note__summary">{summary}</p>}
      </div>
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        ref={buttonRef}
        className={className}
        style={{ '--note-tilt': `${tilt}deg` }}
        onClick={onClick}
      >
        {content}
      </button>
    )
  }

  return (
    <div className={className} style={{ '--note-tilt': `${tilt}deg` }}>
      {content}
    </div>
  )
}

export function getNoteTilt(index) {
  return NOTE_TILTS[index % NOTE_TILTS.length]
}
