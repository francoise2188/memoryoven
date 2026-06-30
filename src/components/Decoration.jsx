export default function Decoration({
  image,
  x,
  y,
  rotation = 0,
  scale = 1,
  zIndex = 3,
  width,
  shadow = false,
  className = '',
  sway = false,
}) {
  const wrapClass = [
    'decoration-wrap',
    shadow ? 'decoration-wrap--grounded' : '',
    className,
    sway ? 'decoration-wrap--sway' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapClass} style={{ left: x, top: y, zIndex }}>
      <img
        className="decoration"
        src={image}
        alt=""
        style={{
          width,
          transform: `rotate(${rotation}deg) scale(${scale})`,
        }}
        draggable={false}
      />
    </div>
  )
}
