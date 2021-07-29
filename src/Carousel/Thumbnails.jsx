import classNames from "classnames";
import styles from "./styles.module.scss";

export default function Thumbnails({
  current = 0,
  onChange = () => {},
  items = []
}) {
  const cssFor = (index) =>
    classNames({
      [styles.active]: index === current
    });

  return (
    <div className={styles.Thumbnails}>
      {items.map((item, i) => (
        <button className={cssFor(i)} key={i} onClick={() => onChange(i)}>
          <img src={item.thumbnail} alt={i} />
        </button>
      ))}
    </div>
  );
}
