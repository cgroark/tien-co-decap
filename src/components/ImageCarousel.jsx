import { useEffect, useState } from "react";

export default function ImageCarousel({ images, autoPlay = false, interval = 5000 }) {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, images.length, interval]);

  const image = images[index];

  return (
    <div className="carousel">
    <div className="carousel-image">
        <img
          src={image.thumbnail_image || image.full_image}
          alt={image.caption || ""}
        />
      {image.caption && (
        <p className="image-caption">{image.caption}</p>
      )}
    </div>

    {!autoPlay && images.length > 1 && (
      <>
        <button
          className="carousel-control prev"
          onClick={prev}
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          className="carousel-control next"
          onClick={next}
          aria-label="Next image"
        >
          ›
        </button>
      </>
    )}
  </div>

  );
}
