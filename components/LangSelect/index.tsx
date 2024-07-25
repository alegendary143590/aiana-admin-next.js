import React, { useState } from "react"
import Image from "next/image"

const CustomDropdown = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState<any>({
    name: "",
    flgURL: "",
  })

  const handleCountryChange = (country: any) => {
    setSelectedCountry(country) // Update the selected country state
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => document.getElementById("custom-dropdown-menu").classList.toggle("hidden")}
        aria-label="Toggle menu"
        className="border-2 border-[#D2D2D2] rounded-xl py-2 px-4 inline-flex items-center justify-between w-full"
      >
        {selectedCountry.name !== "" ? (
          <>
            <Image
              src={`/images/flags/${selectedCountry.flgURL}`}
              alt={selectedCountry.name}
              className="scale-x-150 rounded-md"
              width={20}
              height={20}
            />
            <span className="ml-2">{selectedCountry.name}</span>
          </>
        ) : (
          <>
            <Image
              src={`/images/flags/${countries[0].flgURL}`}
              alt={countries[0].name}
              className="rounded-md"
              width={20}
              height={20}
            />
            <span className="ml-2">{countries[0].name}</span>
          </>
        )}
        <svg
          className="fill-current size-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707-.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>
      <ul
        id="custom-dropdown-menu"
        className="absolute hidden mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base z-10 overflow-auto focus:outline-none"
      >
        {countries.map((country: any) => (
          <button
            type="button"
            key={country.name}
            onClick={() => handleCountryChange(country)}
            className="cursor-pointer hover:bg-blue-500 hover:text-white p-2 flex items-center"
          >
            <div className="flex items-center">
              <Image
                src={`/images/flags/${country.flgURL}`}
                alt={country.name}
                className="mr-2 rounded-md"
                width={20}
                height={20}
              />
              <span className="ml-2">{country.name}</span>
            </div>
          </button>
        ))}
      </ul>
    </div>
  )
}

export default CustomDropdown
