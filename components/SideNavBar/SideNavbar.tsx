import * as React from "react"
import { logOut } from "@/components/utils/common"
import { useRouter } from "next/router"
import MenuList from "./MenuList"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import Image from "next/image"

const SideNavBar = () => {
  const router = useRouter()
  const [open, setOpen] = React.useState(true)
  const [logo, setLogo] = React.useState("/images/logo_big.png")

  const handleDrawerOpen = () => {
    setOpen(true)
    setLogo("/images/logo_big.png")
  }

  const handleDrawerClose = () => {
    setOpen(false)
    setLogo("/images/logo_short.png")
  }

  const handleLogOut = () => {
    if (logOut()) {
      router.push("/signin")
    }
  }

  return (
    <>
      <div
        className={`sm:flex flex-col h-screen bg-black sm:relative fixed z-[5] left-0 top-0 transition-all duration-300 ${
          open ? "sm:w-[300px] w-[95%]" : "sm:w-16 w-0 overflow-hidden"
        }`}
      >
        <button onClick={handleDrawerOpen} className={`${open ? "p-5" : "sm:mx-auto sm:pt-5"}`}>
          <img src={logo} alt="logo" style={{ height: "2.5rem" }} />
        </button>
        {open && (
          <button
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            className="absolute top-10 -right-2"
          >
            <div className="flex items-center justify-center border-[1px] border-[#BEBEBE] py-1 px-[1px] bg-white rounded-md shadow-[0px_5px_5px_0px_#0000003d]">
              <FaAngleLeft size={15} />
            </div>
          </button>
        )}
        <MenuList open={open} />
        <button
          type="button"
          aria-label="log out"
          title="log out"
          onClick={handleLogOut}
          className={`${open && "bg-[url('/images/button-bg.png')]"} w-full bg-contain bg-no-repeat bg-center rounded-[4px] p-[10px] text-[16px] text-white transition duration-300 hover:opacity-80 mt-auto sm:mb-10 mb-5 flex justify-center items-center`}
        >
          <Image src="/images/navbar/icon_logout.svg" alt="logout" width={18} height={18} />
          <p className={`ml-2 ${open ? "block" : "hidden"}`}>Log out</p>
        </button>
      </div>
      <button
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        className={`absolute top-10 left-0 sm:hidden transition-all duration-300 ${open ? "invisible" : "block"}`}
      >
        <div className="flex items-center justify-center border-[1px] border-[#BEBEBE] py-1 px-[1px] bg-white rounded-md shadow-[0px_5px_5px_0px_#0000003d]">
          <FaAngleRight size={15} />
        </div>
      </button>
    </>
  )
}

export default SideNavBar
