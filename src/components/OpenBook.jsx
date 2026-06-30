const BOOK_IMAGE = '/assets/decor recipes/open book.png'

export default function OpenBook({
  visible = false,
  settled = false,
  flipping = false,
  focused = false,
  toyWallpaper = false,
  children,
}) {
  const stackClass = [
    'recipe-card-stack',
    visible ? ' recipe-card-stack--visible' : '',
    settled ? ' recipe-card-stack--settled' : '',
    focused ? ' recipe-card-stack--focused' : '',
    flipping ? ' recipe-card-stack--flipping' : '',
    toyWallpaper ? ' recipe-card-stack--toy' : '',
  ].join('')

  if (toyWallpaper) {
    return (
      <section className={stackClass}>
        <div className="book-toy-content">{children}</div>
      </section>
    )
  }

  const bookBody = (
    <>
      <div className="recipe-card-shadow" aria-hidden="true" />

      <div className="open-book">
        <img
          className="open-book-spacer"
          src={BOOK_IMAGE}
          alt=""
          aria-hidden="true"
          draggable={false}
        />

        <div className="book-page book-page--left">
          <img src={BOOK_IMAGE} alt="" draggable={false} />
        </div>
        <div className="book-page book-page--right">
          <img src={BOOK_IMAGE} alt="" draggable={false} />
        </div>

        <div className="recipe-card-content">{children}</div>
      </div>
    </>
  )

  return (
    <section className={stackClass}>
      {focused ? <div className="book-focused-scale">{bookBody}</div> : bookBody}
    </section>
  )
}
