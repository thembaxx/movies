const base_img_url = 'https://image.tmdb.org/t/p';

function getBaseImagUrl(size) {
  const s = Number(size) ? 'w' : '';
  return `${base_img_url}/${s}${size}`;
}

function getSrcSetWidth(size) {
  return Number(size) ? `${size}w` : '1280w';
}

function generateImageSizes() {
  const sizes = [92, 154, 185, 342, 500, 780, 'original'];
  return sizes.map((size) => {
    return {
      size: `${size}`,
      base_url: getBaseImagUrl(`${size}`),
      width: getSrcSetWidth(size),
    };
  });
}

export function getSrcSet(imgUrl) {
  if (!imgUrl) return;

  const imageSizes = generateImageSizes();
  if (!imageSizes) return;

  const result = imageSizes.map((size) => {
    return `${size.base_url}/${imgUrl} ${size.width}`;
  });

  return {
    set: result?.join(', '),
    default: `${imageSizes[0].base_url}/${imgUrl}`,
  };
}
