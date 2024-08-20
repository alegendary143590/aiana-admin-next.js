import Image from 'next/image';
import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const ScrollableItems = ({ items, tooltips }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, Math.ceil(items.length / itemsPerPage) - 1))
    };

    const startIndex = currentIndex * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);
    const visibleItems = items.slice(startIndex, endIndex);
    const visibleTooltips = tooltips.slice(startIndex, endIndex);

    return (
        <div className="flex">
            {items.length > itemsPerPage && (
                <button
                    type="button"
                    onClick={handlePrev}
                    className="mr-2 rounded-full p-1 text-[#A536FA]"
                >
                    <FaAngleLeft />
                </button>
            )}
            {visibleItems.map((item, index) => (
                <div key={item.index} className="flex-none relative group w-12 px-2">
                    <Image
                        src={item.item || "/images/logo_sm.png"}
                        alt="bot_avatar"
                        width={40}
                        height={40}
                        className="object-cover rounded-full"
                    />
                    <span className="absolute z-[99] left-1/2 -translate-x-1/2 top-10 scale-0 rounded bg-gray-800 inline p-2 text-xs text-white group-hover:scale-100">{visibleTooltips ? visibleTooltips[index] : ''}</span>
                </div>
            ))}
            {items.length > itemsPerPage && (
                <button
                    type="button"
                    onClick={handleNext}
                    className="ml-2 rounded-full p-1 text-[#A536FA]"
                >
                    <FaAngleRight />
                </button>
            )}
        </div>
    );
};

export default ScrollableItems;