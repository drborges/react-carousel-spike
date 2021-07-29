import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

function useSlider(index) {
  const elementsRef = useRef([]);
  const register = (element) => elementsRef.current.push(element);
  const getElements = () => elementsRef.current.filter((r) => r);
  const getElementByIndex = (index) => getElements()[index];

  return {
    register,
    getElements,
    getElementByIndex
  };
}

function useIntersectionTracker(elements) {
  const lastIntersectedElement = useRef();
  const scrollIntoView = () =>
    lastIntersectedElement?.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        console.log(">>>> intersecting?", firstEntry.target);
        if (firstEntry.isIntersecting) {
          lastIntersectedElement.current = firstEntry.target;
        }
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, [elements]);

  return {
    scrollIntoView
  };
}

export default function Slides({
  current = 0,
  onChange = () => {},
  onSlideClick = () => {},
  items = []
}) {
  const { register, getElementByIndex, getElements } = useSlider(current);
  const { scrollIntoView } = useIntersectionTracker(getElements());
  const handleScroll = debounce(scrollIntoView, 200);

  useEffect(() => {
    getElementByIndex(current).scrollIntoView({
      behavior: "smooth"
    });
  }, [current, getElementByIndex]);

  return (
    <div className={styles.Slides} onScroll={handleScroll}>
      {items.map((item, i) => (
        <button key={i} ref={register} onClick={() => onSlideClick(i)}>
          <img src={item.url} alt={i} />
        </button>
      ))}
    </div>
  );
}
