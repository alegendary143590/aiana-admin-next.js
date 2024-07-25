import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSideMenu } from "@/providers/SideMenuProvider"
import Image from "next/image"

const MenuList = ({ open }) => {
  const { push } = useRouter()
  const [userRole, setUserRole] = useState("admin")

  useEffect(() => {
    setUserRole(localStorage.getItem("role"))
  })

  const {
    navActiveContainerClasses,
    iconActiveClasses,
    iconClasses,
    navContainerClasses,
    navClasses,
    profileActive,
    dashboardPageActive,
    dashboardActive,
    helpActive,
    settingsActive,
    createActive,
    knowledgeActive,
    ticketsActive,
    usersActive,
  } = useSideMenu()

  return (
    <div className="relative z-[4] w-full mt-3">
      <div className={`text-white font-["Roboto-Thin"] sm:mb-3 px-5 ${open ? "" : "invisible"}`}>
        QUICK ACCESS
      </div>
      <button
        type="button"
        className="flex justify-center items-center w-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/dashboardpage")}
      >
        <div
          className={`${
            dashboardPageActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
        >
          <div className={dashboardPageActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_dashboard.svg" width={18} height={20} />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white text-[16px]`}>Dashboard</p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/admin")}
      >
        <div
          className={`${
            profileActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
        >
          <div className={profileActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_account.svg" width={18} height={20} />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white text-[16px]`}>
            My Account
          </p>
        </div>
      </button>
      {userRole === "admin" && (
        <button
          type="button"
          className="flex justify-center items-center w-full"
          // className={profileActive ? navActiveContainerClasses : navContainerClasses}
          onClick={() => push("/users")}
        >
          <div
            className={`${
              usersActive ? navActiveContainerClasses : navContainerClasses
            } flex items-center justify-start`}
          >
            <div className={usersActive ? iconActiveClasses : iconClasses}>
              <Image src="/images/navbar/icon_users.svg" width={18} height={20} />
            </div>
            <p className={`${open ? navClasses : "hidden"} ml-2 text-white text-[16px]`}>Users</p>
          </div>
        </button>
      )}
      <div
        className={`text-white sm:mb-3 font-["Roboto-Thin"] mt-5 px-5 ${
          open ? "" : "invisible"
        }`}
      >
        APPS & FEATURES
      </div>
      <button
        type="button"
        className="flex justify-center items-center w-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/chatbot")}
      >
        <div
          className={`${
            createActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
        >
          <div className={createActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_chatbot.svg" width={30} height={24} />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white text-[16px]`}>Chatbot</p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/knowledge")}
      >
        <div
          className={`${
            knowledgeActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
        >
          <div className={knowledgeActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_knowledge.svg" width={18} height={20} />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white text-[16px]`}>
            Knowledge Base
          </p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/dashboard")}
      >
        <div
          className={`${
            dashboardActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
        >
          <div className={dashboardActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_chatlogs.svg" width={18} height={20} />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white text-[16px]`}>Chatlogs</p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/tickets")}
      >
        <div
          className={`${
            ticketsActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
        >
          <div className={ticketsActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_tickets.svg" width={18} height={20} />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white text-[16px]`}>Tickets</p>
        </div>
      </button>
      <div
        className={`text-white sm:mb-3 font-["Roboto-Thin"] mt-5 px-5 ${
          open ? "" : "invisible"
        }`}
      >
        SUPPORT
      </div>
      <button
        type="button"
        className="flex justify-center items-center w-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/settings")}
      >
        <div
          className={`${
            settingsActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
        >
          <div className={settingsActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_settings.png" width={18} height={20} />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white text-[16px]`}>Settings</p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/help")}
      >
        <div
          className={`${
            helpActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
        >
          <div className={helpActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_help.svg" width={18} height={20} />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white text-[16px]`}>
            Help Center
          </p>
        </div>
      </button>
    </div>
  )
}

export default MenuList
