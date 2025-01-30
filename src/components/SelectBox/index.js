import { useState, useRef, useEffect } from "react";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron.svg";
import styles from "./styles.module.scss";

const SelectBox = ({ options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    options.find((opt) => opt.value === selectedValue) || options[0]
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    const newSelected = options.find((opt) => opt.value === selectedValue);
    if (newSelected) setSelected(newSelected);
  }, [selectedValue, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect && onSelect(option.value);
  };

  return (
    <div className={styles.selectBox} ref={dropdownRef}>
      <button className={styles.button} onClick={toggleDropdown}>
        {selected.label}
        <ChevronIcon
          className={`${styles.icon} ${isOpen ? styles.rotated : ""}`}
        />
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${
                option.value === selected.value ? styles.selected : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
