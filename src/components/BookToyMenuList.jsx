const ROW_TILTS = [-0.7, 0.55, -0.45, 0.65, -0.55, 0.4]

export default function BookToyMenuList({
  items,
  selectedIndex,
  onSelect,
  renderIcon,
  itemRefs,
  viewportRef,
  bump = false,
}) {
  return (
    <div
      className={`book-text book-text--left book-text--menu book-text--physical book-text--toy-menu${bump ? ' book-text--menu-bump' : ''}`}
    >
      <div ref={viewportRef} className="book-toy-menu-viewport">
        <ul className="book-toy-menu-list">
          {items.map((item, index) => {
            const isSelected = index === selectedIndex

            return (
              <li key={item.id} className="book-toy-menu-list__item">
                <button
                  type="button"
                  ref={(element) => {
                    itemRefs.current[index] = element
                  }}
                  className={`book-toy-menu-item${isSelected ? ' book-toy-menu-item--selected' : ''}`}
                  style={{ '--row-tilt': `${ROW_TILTS[index % ROW_TILTS.length]}deg` }}
                  onClick={() => onSelect(index)}
                >
                  <span className="book-toy-menu-item__icon-wrap" aria-hidden="true">
                    {renderIcon?.(item)}
                  </span>
                  <span className="book-toy-menu-item__label">{item.title}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
