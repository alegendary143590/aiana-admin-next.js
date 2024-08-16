import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const CustomAutocomplete = ({ currentValue, options, onChange }) => {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    useEffect(() => {
        setInputValue(currentValue);
    }, [currentValue])

    const handleClick = (option) => {
        onChange(option);
        setInputValue(option);
        setIsOpen(false);
    };


    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="flex flex-col mt-4" ref={inputRef}>
            <div className="relative">
                <div>
                    <button type="button" onClick={toggleOpen} className="flex justify-between items-center w-full rounded-md border border-[#767676] shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-indigo-500" aria-haspopup="true" aria-expanded={isOpen}>
                        {inputValue || ''}
                        <FaChevronDown />
                    </button>
                </div>
                {
                    isOpen && <ul className="absolute bottom-12 z-10 w-full bg-white shadow-lg max-h-60 overflow-auto rounded-md my-1 filter">
                        {options.map((option) => (
                            <button
                                type="button"
                                key={option}
                                onClick={() => handleClick(option)}
                                className="cursor-pointer block px-4 py-2 hover:bg-gray-100 w-full text-start">
                                {option}
                            </button>
                        ))}
                    </ul>
                }

            </div>
        </div>
    );
};

export default CustomAutocomplete;
