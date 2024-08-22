import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function CustomSelect({ props, text, id, value, onChange }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(props.find((option) => option.text === value) || props[0]); // Set initial selected value based on provided value
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleChange = (newValue) => {
    setSelectedValue(newValue);
    onChange(id, newValue.text); // Notify parent component about the change
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative inline-block w-full text-left" ref={menuRef}>
      <div>
        <button type="button" onClick={toggleOpen} className="flex justify-between items-center w-full rounded-md border border-[#767676] shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-indigo-500" aria-haspopup="true" aria-expanded={isOpen}>
          {selectedValue.name || text}
          <FaChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[5]">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="block px-4 py-2 text-sm text-gray-700" role="menuitem">{text}</div>
            {props.map((item) => (
              <button type="button" key={item.name} className="w-full block px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={() => handleChange(item)}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}