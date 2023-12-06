import { useState, useRef, useCallback, useEffect, FocusEvent } from "react";
import { ArrowIcon, CloseIcon } from "../Icons";
import styles from "./SearchInput.module.css";

type Style = {
  label?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  size?: "small" | "normal";
};

export interface Default {
  id: string;
  label: string;
}

export interface Props<T> {
  data: T[];
  disabled?: boolean;
  style?: Style;
  handleOnChange: (value: T) => T;
}

export const SearchInput = <T extends Default>({
  data,
  disabled = false,
  style,
  handleOnChange,
}: Props<T>): JSX.Element => {
  const [value, setValue] = useState("");
  const [toggle, setToggle] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [results, setResults] = useState<T[]>(data);
  const [selected, setSelected] = useState<T>();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultContainer = useRef<HTMLDivElement>(null);
  const [inputFocus, setInputFocus] = useState(false);

  const onBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      if (toggle) {
        setToggle(false);
      }
    }
    setInputFocus(false);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { currentTarget } = e;
    const filteredList = data.filter((item) =>
      item.label
        .toString()
        .toLocaleLowerCase()
        .startsWith(currentTarget.value.toLocaleLowerCase())
    );
    setValue(currentTarget.value);
    setResults(filteredList);
    setToggle(true);
  };

  const onClose: React.MouseEventHandler<HTMLInputElement> = () => {
    setResults(data);
    setToggle(false);
    setValue("");
  };

  const onOpen: React.MouseEventHandler<HTMLInputElement> = () => {
    setResults(data);
    setToggle(!toggle);
    setValue("");
  };

  const onSelectItem = (item: T): void => {
    setToggle(false);
    setValue(item.label);
    setSelected(item);
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setToggle(false);
  }, []);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e;
    let nextIndexCount = 0;

    // move down
    if (key === "ArrowDown")
      nextIndexCount = (focusedIndex + 1) % results.length;

    // move up
    if (key === "ArrowUp")
      nextIndexCount = (focusedIndex + results.length - 1) % results.length;

    // hide search results
    if (key === "Escape") resetSearchComplete();

    // select the current item
    if (key === "Enter") {
      e.preventDefault();
      const selectedItem = results[focusedIndex];
      if (!selectedItem) return resetSearchComplete();
      setSelected(selectedItem);
      setValue(selectedItem.label);
      resetSearchComplete();
    }

    setFocusedIndex(nextIndexCount);
    return null;
  };

  useEffect(() => {
    if (!resultContainer.current) return;

    resultContainer.current.scrollIntoView({
      block: "center",
    });
  }, [focusedIndex]);

  useEffect(() => {
    if (style?.defaultValue) setValue(style.defaultValue);
  }, []);

  useEffect(() => {
    handleOnChange(selected as T);
  }, [selected]);

  return (
    <div
      className={`${styles.container} ${style?.fullWidth && styles.fw}`}
      tabIndex={0}
      onBlur={onBlur}
      onFocus={(): void => setInputFocus(true)}
      onKeyDown={handleKeyDown}
      style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <div
        className={`${styles.containerSelect} ${
          (inputFocus || !!value) && styles.lg
        } ${style?.size == "small" && styles.sm}`}
      >
        <div
          className={styles.containerInput}
          onClick={(): void => {
            inputRef.current?.focus();
            setToggle(true);
          }}
        >
          <div
            className={`${styles.slabel} ${
              (inputFocus || !!value) &&
              (style?.size == "small" ? styles.smlg : styles.nmlg)
            }`}
          >
            {style?.label || "Select"}
          </div>

          <input
            className={styles.input}
            onChange={handleChange}
            value={value}
            ref={inputRef}
            type="text"
          />
        </div>
        <div
          className={styles.containerButtons}
          onClick={(): void => {
            inputRef.current?.focus();
          }}
        >
          <div className={styles.closeButton} onClick={onClose}>
            {value && <CloseIcon />}
          </div>
          <span className={styles.divisorButton} />
          <div
            className={`${styles.openButton} ${toggle && styles.rotIcon}`}
            onClick={onOpen}
          >
            <ArrowIcon />
          </div>
        </div>
      </div>
      {toggle &&
        (results.length ? (
          <div className={`${styles.list} ${style?.fullWidth && styles.fw}`}>
            {results?.map((item, index) => (
              <div
                className={styles.item}
                key={item.label}
                ref={index === focusedIndex ? resultContainer : null}
                onClick={(): void => onSelectItem(item)}
                style={{
                  backgroundColor:
                    index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.list}>
            <div className={styles.item}>Not found</div>
          </div>
        ))}
    </div>
  );
};
