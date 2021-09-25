import { useState, useRef, useEffect } from 'react'

const PADDINGS = 110;

const useSliding = (elementWidth, countElements) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [distance, setDistance] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0)
  const [viewed, setViewed] = useState(0);

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth - PADDINGS;
    console.log(`containerWidth`, containerRef)

    setContainerWidth(containerWidth);
    console.log('hello', Math.floor(containerWidth / elementWidth));
    console.log(`containerWidth`, containerWidth)
    console.log(`elementWidth`, elementWidth)

    setTotalInViewport(Math.floor(containerWidth / elementWidth));
  }, [containerRef.current]);

  const handlePrev = () => {
    console.log(Math.floor(containerWidth / elementWidth));
    setViewed(viewed - totalInViewport);
    setDistance(distance + (containerWidth));
  }

  const handleNext = () => {
    console.log(Math.floor(containerWidth / elementWidth));
    setViewed(viewed + totalInViewport);
    setDistance(distance - (containerWidth))
  }

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` }
  };

  const hasPrev = distance < 0;
  const hasNext = (viewed + totalInViewport) < countElements;

  return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext };
}

export default useSliding;