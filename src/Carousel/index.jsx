import classNames from "classnames";
import { useState } from "react";
import Slides from "./Slides";

import styles from "./styles.module.scss";
import Thumbnails from "./Thumbnails";

export default function Carousel({
  current = 0,
  items = [],
  onChange = () => {},
  onSlideClick = () => {}
}) {
  const [currentIndex, setCurrentIndex] = useState(current);
  const handleChange = (index) => {
    setCurrentIndex(index);
    onChange(items[index], index);
  };

  return (
    <div className={classNames(styles.Carousel)}>
      <Slides
        current={currentIndex}
        items={items}
        onChange={handleChange}
        onSlideClick={onSlideClick}
      />
      <Thumbnails
        current={currentIndex}
        items={items}
        onChange={handleChange}
      />
    </div>
  );
}
