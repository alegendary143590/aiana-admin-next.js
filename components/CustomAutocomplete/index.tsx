import React, { useState, useEffect } from 'react';

const CustomAutocomplete = ({ currentValue, options, onChange }) => {
    const [inputValue, setInputValue] = useState('');
    const filteredOptions = options.filter(option => option.toLowerCase().includes(inputValue.toLowerCase()))
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.log('options:', filteredOptions);
        console.log('inputValue:', inputValue);
    }, [options, inputValue]);

    useEffect(() => {
        setInputValue(currentValue);
    }, [currentValue])

    const handleClick = (option) => {
        onChange(option);
        setInputValue(option);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col mt-4">
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => !isOpen && setIsOpen(false)}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
                />
                {
                    isOpen && <ul className="absolute bottom-12 z-10 w-full bg-white shadow-lg max-h-60 overflow-auto rounded-md my-1 filter">
                        {filteredOptions.map((option) => (
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
