import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { useSideMenu } from "@/providers/SideMenuProvider"
import { logOut } from "@/components/utils/common"
import MenuList from "./MenuList"

const SideNavBar = () => {
  const t = useTranslations('common');
  // const stripe = useStripe();
  // const element = useElements();
  const { isOpen, setOpen } = useSideMenu();
  const router = useRouter();
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogOut = () => {
    if (logOut()) {
      router.push("/signin")
    }
    // router.push(constants.paymentLinks.preOrder)
  }

  return (
    <>
      <div
        className={`sm:flex flex-col h-screen bg-black sm:relative fixed z-[15] left-0 top-0 transition-all ease-in-out duration-300 justify-between ${isOpen ? "sm:w-[300px] w-[95%]" : "sm:w-16 w-0 overflow-hidden"
          }`}
      >
        <div>

          <button type="button" onClick={handleDrawerOpen} className={`${isOpen ? "p-5" : "sm:mx-auto sm:pt-5 sm:pl-3"}`}>
            <img src={isOpen? "/images/logo_final_white.png":"/images/logo_short_white.png"} alt="logo" style={{ height: "2.5rem" }} />
          </button>
          {isOpen && (
            <button
              type="button"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerClose}
              className="absolute top-10 -right-2 z-10"
            >
              <div className="flex items-center justify-center border-[1px] border-[#BEBEBE] py-1 px-[1px] bg-white rounded-md shadow-[0px_5px_5px_0px_#0000003d]">
                <FaAngleLeft size={15} />
              </div>
            </button>
          )}
          <MenuList open={isOpen} />
        </div>
        <div>
          <button
            type="button"
            aria-label="log out"
            title="log out"
            onClick={handleLogOut}
            className={`${isOpen && "bg-[url('/images/button-bg.png')]"} w-full bg-contain bg-no-repeat bg-center rounded-[4px] p-[10px] text-[16px] text-white transition duration-300 hover:opacity-80 mt-auto sm:mb-10 mb-5 flex justify-center items-center`}
          >
            <Image src="/images/navbar/icon_logout.svg" alt="logout" width={18} height={18} className="opacity-90" />
            <p className={`ml-2 opacity-90 ${isOpen ? "block" : "hidden"}`}>{t('Log_out')}</p>
          </button>
        </div>
      </div>
      <button
        type="button"
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        className={`absolute top-10 left-0 sm:hidden transition-all duration-300 z-[15] ${isOpen ? "invisible" : "block"}`}
      >
        <div className="flex items-center justify-center border-[1px] border-[#BEBEBE] py-1 px-[1px] bg-white rounded-md shadow-[0px_5px_5px_0px_#0000003d]">
          <FaAngleRight size={15} />
        </div>
      </button>
    </>
  )
}

export default SideNavBar
