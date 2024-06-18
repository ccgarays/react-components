import { useState } from "react";

import { ArrowIcon } from "../Icons";
import styles from "./Accordion.module.css";

interface Data<T> {
  id: number;
  title: string;
  content: T;
}

interface Props<T> {
  data: Data<T>[];
}

export const Accordion = <T,>({ data }: Props<T>): JSX.Element => {
  const [toggle, setToggle] = useState(-1);

  const handleClick = (id: number) => {
    if (id == toggle) setToggle(-1);
    else setToggle(id);
  };
  return (
    <div className={styles.container}>
      {data.map((item) => (
        <Section
          key={item.id}
          data={item}
          onToggle={handleClick}
          toggle={toggle}
        />
      ))}
    </div>
  );
};

interface SectionProps<T> {
  data: Data<T>;
  onToggle: (id: number) => void;
  toggle: number;
}

const Section = <T,>({
  data: { id, title, content },
  onToggle,
  toggle,
}: SectionProps<T>): JSX.Element => {
  const isOpen = toggle == id;
  return (
    <>
      <div className={styles.containerTitle} onClick={() => onToggle(id)}>
        <h3>{title}</h3>
        <div className={`${styles.containerIcon} ${isOpen && styles.rotIcon}`}>
          <ArrowIcon size={20} color="blue" />
        </div>
      </div>
      <div className={`${styles.wrapper} ${isOpen && styles.open}`}>
        <p className={styles.content}>{content as React.ReactNode}</p>
      </div>
    </>
  );
};
