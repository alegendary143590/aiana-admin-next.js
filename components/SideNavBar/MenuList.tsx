import { useRouter } from "next/router"
import { useSideMenu } from "@/providers/SideMenuProvider"
import Image from "next/image"

const MenuList = ({ open }) => {
  const { push } = useRouter()


  const {
    navActiveContainerClasses,
    iconActiveClasses,
    iconClasses,
    navContainerClasses,
    navClasses,
    profileActive,
    dashboardActive,
    createActive,
    knowledgeActive,
    ticketsActive,
    usersActive,
    role
  } = useSideMenu()

  return (
    <div className={`relative z-[4] w-full ${open ? "mt-3" : "mt-10"}`}>
      <button
        type="button"
        className="flex justify-center items-center w-full"
        onClick={() => push("/admin")}
      >
        <div
          className={`${
            profileActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
        >
          <div className={profileActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_account.svg" width={18} height={20} className="opacity-90" />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white opacity-90 text-[16px]`}>
            My Account
          </p>
        </div>
      </button>
      {role === "admin" && (
        <button
          type="button"
          className="flex justify-center items-center w-full"
          onClick={() => push("/users")}
        >
          <div
            className={`${
              usersActive ? navActiveContainerClasses : navContainerClasses
            } flex items-center justify-start`}
          >
            <div className={usersActive ? iconActiveClasses : iconClasses}>
              <Image src="/images/navbar/icon_users.svg" width={18} height={20} className="opacity-90" />
            </div>
            <p className={`${open ? navClasses : "hidden"} ml-2 text-white opacity-90 text-[16px]`}>Users</p>
          </div>
        </button>
      )}
      <button
        type="button"
        className="flex justify-center items-center w-full"
        onClick={() => push("/chatbot")}
      >
        <div
          className={`${
            createActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
          style={{ paddingRight: !open && "14px", paddingLeft: !open && "14px" }}
        >
          <div className={createActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_chatbot.svg" width={24} height={20} className="opacity-90" />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white opacity-90 text-[16px]`}>Chatbot</p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-full"
        onClick={() => push("/knowledge")}
      >
        <div
          className={`${
            knowledgeActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
        >
          <div className={knowledgeActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_knowledge.svg" width={18} height={20} className="opacity-90" />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white opacity-90 text-[16px]`}>
            Knowledge Base
          </p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-full"
        onClick={() => push("/dashboard")}
      >
        <div
          className={`${
            dashboardActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
        >
          <div className={dashboardActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_chatlogs.svg" width={18} height={20} className="opacity-90" />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white opacity-90 text-[16px]`}>Chatlogs</p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-full"
        onClick={() => push("/tickets")}
      >
        <div
          className={`${
            ticketsActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
        >
          <div className={ticketsActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_tickets.svg" width={18} height={20} className="opacity-90" />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white opacity-90 text-[16px]`}>Tickets</p>
        </div>
      </button>
    </div>
  )
}

export default MenuList
