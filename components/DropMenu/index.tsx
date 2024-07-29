import { useEffect, useRef, useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import Language from "@/components/Language"

interface ISelectOptions {
  value: number
  name: string
  flgURL: string
}

export default function SelectLabels({ setLang }) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<ISelectOptions>({
    value: 10,
    name: "ENG",
    flgURL: "https://flagicons.lipis.dev/flags/4x3/us.svg",
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleOpen = () => setIsOpen(!isOpen)

  const handleChange = (item) => {
    setLang(item.value)
    setSelectedValue(item)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block w-full text-left">
      <div className="w-full">
        <button
          type="button"
          onClick={toggleOpen}
          className="flex justify-between items-center w-full rounded-md border text-white border-white shadow-sm px-4 py-2 text-sm font-medium focus:outline-none focus:border-white"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {selectedValue.name}
          <FaChevronDown />
        </button>
      </div >

      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[5]" ref={menuRef}>
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Language.map((item) => (
              <button
                type="button"
                key={item.value}
                className="w-full block px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleChange(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
