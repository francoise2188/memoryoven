const homeDecorations = [
  // Cat on the counter, beside the pot
  {
    id: 'cat',
    image: '/assets/animals/winston.png',
    x: 142,
    y: 298,
    rotation: 10,
    width: 175,
    zIndex: 11,
    shadow: true,
    nav: { x: 8, y: 478, width: 125, rotation: 14, zIndex: 4 },
  },

  // Dog on the floor, looking toward the card
  {
    id: 'dog',
    image: '/assets/animals/walter.png',
    x: 720,
    y: 389,
    rotation: 3,
    width: 235,
    zIndex: 7,
    shadow: true,
    nav: { x: 852, y: 488, width: 168, rotation: 2, zIndex: 4 },
  },
]

export const wallpaperDecorations = [
  // whisk — skipped: no standalone whisk asset in /public/assets

  {
    id: 'wallpaper-pink-flowers',
    image: '/assets/decor recipes/pink scribble flowers.png',
    x: 28,
    y: 38,
    rotation: -18,
    width: 102,
    zIndex: 1,
  },
  {
    id: 'wallpaper-star-cluster',
    image: '/assets/decor recipes/star cluster.png',
    x: 924,
    y: 11,
    rotation: 12,
    width: 99,
    zIndex: 1,
  },
  {
    id: 'wallpaper-twine-bow',
    image: '/assets/decor recipes/cooking twine bow.png',
    x: 44,
    y: 472,
    rotation: -25,
    width: 74,
    zIndex: 1,
  },
  {
    id: 'wallpaper-vanilla',
    image: '/assets/ingredients/vanilla extract.png',
    x: 938,
    y: 248,
    rotation: 15,
    width: 52,
    zIndex: 1,
  },
  {
    id: 'wallpaper-butter',
    image: '/assets/ingredients/butter on tray.png',
    x: 868,
    y: 518,
    rotation: -7,
    width: 86,
    zIndex: 1,
  },
  {
    id: 'wallpaper-recipe-book',
    image: '/assets/decor recipes/recipe book brown.png',
    x: 22,
    y: 142,
    rotation: -14,
    width: 92,
    zIndex: 1,
  },
  {
    id: 'wallpaper-stained-card',
    image: '/assets/decor recipes/stained recipe card.png',
    x: 912,
    y: 332,
    rotation: 16,
    width: 76,
    zIndex: 1,
    hideOnNav: true,
  },
  {
    id: 'wallpaper-cookies',
    image: '/assets/sweets/2 chocolate chip cookies.png',
    x: 864,
    y: 101,
    rotation: -10,
    width: 72,
    zIndex: 1,
    hideOnNav: true,
  },
  {
    id: 'wallpaper-pancakes',
    image: '/assets/sweets/pancakes.png',
    x: 38,
    y: 312,
    rotation: 7,
    width: 100,
    zIndex: 1,
    hideOnNav: true,
  },
]

export const ambientDecorations = [
  {
    id: 'dust-1',
    image: '/assets/decor recipes/sparkle cluster.png',
    x: 420,
    y: 88,
    width: 36,
    zIndex: 3,
    className: 'ambient-dust ambient-dust--1',
  },
  {
    id: 'dust-2',
    image: '/assets/decor recipes/sparkle cluster.png',
    x: 580,
    y: 120,
    width: 28,
    zIndex: 3,
    className: 'ambient-dust ambient-dust--2',
  },
]

export default homeDecorations
