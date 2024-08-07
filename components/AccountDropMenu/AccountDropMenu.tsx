import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { useSideMenu } from "@/providers/SideMenuProvider"
import { logOut } from "../utils/common"

const AccountManagementDropdown = () => {
  const { push } = useRouter()
  const { setRole } = useSideMenu()

  const [isOpen, setIsOpen] = useState(false)
  const [userRole, setUserRole] = useState("Guest")
  const [userName, setUserName] = useState("")
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    const role = localStorage.getItem("role")
    const name = localStorage.getItem("name")
    if (role) {
      setRole(role)
      setUserRole(role)
    }
    if (name) {
      setUserName(name)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleLogOut = () => {
    if (logOut()) {
      push("/signin")
    }
  }

  const handleOptionClick = (option: string) => {
    switch (option) {
      case "Profile":
        push("/admin")
        break
      case "Logout":
        handleLogOut()
        break
      default:
        break
    }
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button type="button" onClick={toggleDropdown} className="flex items-center space-x-3">
        <Image src="/images/users/avatar-default.svg" alt="avatar" width={40} height={40} />
        <div className="sm:flex hidden flex-col justify-between items-start">
          <p className="font-bold text-[14px]">{userName}</p>
          <p className="text-[#737791]">{userRole}</p>
        </div>
        <svg
          className="fill-current size-5 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707-.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              type="button"
              onClick={() => handleOptionClick("Profile")}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-start"
              role="menuitem"
            >
              Profile
            </button>
            <hr />
            <button
              type="button"
              onClick={() => handleOptionClick("Logout")}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-start"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountManagementDropdown
