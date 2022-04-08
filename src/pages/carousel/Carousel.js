import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./carousel.module.css";

const scrollDirection = {
  next: "next",
  previous: "previous",
};

const Carousel = ({ items }) => {
  const transform = useRef(0);
  const [nextEnabled, setNextEabled] = useState(true);
  const [prevEnabled, setPrevEnabled] = useState(true);

  const carouselRef = useRef(0);
  const carouselScrollWidth = useRef(0);
  const carouselWidth = useRef(0);
  const rowClass = useRef(null);

  // scroll handler
  const handleScroll = (direction) => {
    if (!carouselRef.current) return;

    switch (direction) {
      case scrollDirection.next:
        transform.current -= carouselWidth.current;
        break;
      case scrollDirection.previous:
        transform.current += carouselWidth.current;
        break;
      default:
        transform.current = 0;
        break;
    }

    setTransform(transform.current);
  };

  // Button enabled states.
  const updateButtonEnabledState = (transform) => {
    setPrevEnabled(transform !== 0);
    setNextEabled(
      transform + carouselWidth.current < carouselRef.current.scrollWidth
    );
  };

  const setTransform = (value) => {
    updateButtonEnabledState(Math.abs(value));

    carouselRef?.current.scroll({
      top: 0,
      left: Math.abs(value),
      behavior: "smooth",
    });
  };

  // ResizeObserver to handle width change.
  const handleResizeObserver = useCallback((entries) => {
    const entry = entries[0];
    let width;

    if (entry.contentBoxSize) {
      // Firefox implements `contentBoxSize` as a single content rect, rather than an array
      const contentBoxSize = Array.isArray(entry.contentBoxSize)
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize;

      width = contentBoxSize.inlineSize;
    } else {
      width = entry.contentRect.width;
    }

    carouselWidth.current = width;
    carouselScrollWidth.current = carouselRef.current.scrollWidth;
  }, []);

  useEffect(() => {
    const rc = "row flex-nowrap row-cols-3 row-cols-sm-4";
    const gaps = "g-0 gx-2";
    rowClass.current = `${rc} ${gaps}`;

    // ResizeObserver carousel
    const observer = new ResizeObserver(handleResizeObserver);
    observer.observe(carouselRef?.current);

    return () => {
      transform.current = 0;
      rowClass.current = null;
      observer.unobserve(carouselRef?.current);

      setNextEabled(true);
      setPrevEnabled(false);

      carouselRef.current = null;
      carouselScrollWidth.current = null;
      carouselWidth.current = null;
    };
  }, [handleResizeObserver]);

  return (
    <div className="container-fluid g-0">
      {/* Items */}
      <div className={`${styles.carousel} ps-3`}>
        <div
          ref={carouselRef}
          className={`${rowClass.current} ${styles.row} pe-5`}
        >
          {items?.map((item, i) => (
            <div key={i} className="col">
              {item}
            </div>
          ))}
        </div>

        {/* nav buttons */}
        <div className={`${styles.navButtonsWrapper}`}>
          {prevEnabled && (
            <div
              role="button"
              className={`${styles.button} ${styles.prev}`}
              onClick={() => handleScroll(scrollDirection.previous)}
            >
              <i className={`bi bi-chevron-left`}></i>
            </div>
          )}
          {nextEnabled && (
            <div
              role="button"
              className={`${styles.button} ${styles.next}`}
              onClick={() => handleScroll(scrollDirection.next)}
            >
              <i className={`bi bi-chevron-right`}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
