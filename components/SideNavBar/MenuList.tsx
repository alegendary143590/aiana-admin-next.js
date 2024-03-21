import { useRouter } from "next/router"
import Media from "@/shared/Media"
import { useSideMenu } from "@/providers/SideMenuProvider"
import MenuItemActive from "./MenuItemActive"

const MenuList = () => {
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
  } = useSideMenu()

  return (
    <div className="relative z-[4] w-full mt-3">
      <button
        type="button"
        className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/admin")}
        style={{ height: "60px", marginBottom: "5px" }}
      >
        <div className={profileActive ? iconActiveClasses : iconClasses}>
          <Media
            type="image"
            link={
              "/images/Admin/profile.png"
            }
            blurLink={
              profileActive ? "/images/Admin/dashboard-active.png" : "/images/Admin/dashboard.png"
            }
            containerClasses={"w-[20px] h-[20px]"}
          />
        </div>
        <p className={navClasses} style={{ fontSize: "20px" }}>My Profile</p>
        {profileActive && <MenuItemActive />}
      </button>
      <button
        type="button"
        className={createActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/chatbot")}
        style={{ height: "60px", marginBottom: "5px" }}
      >
        <div className={createActive ? iconActiveClasses : iconClasses}>
          <Media
            type="image"
            link="/images/Admin/sparkle.png"
            blurLink="/images/Admin/sparkle.png"
            containerClasses={"w-[20px] h-[20px]"}
          />
        </div>
        <p className={navClasses} style={{ fontSize: "20px" }}>Chatbot</p>
        {createActive && <MenuItemActive />}
      </button>
      <button
        type="button"
        className={knowledgeActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/knowledge")}
        style={{ height: "60px", marginBottom: "5px" }}
      >
        <div className={knowledgeActive ? iconActiveClasses : iconClasses}>
          <Media
            type="image"
            link="/images/Admin/dashboard.svg"
            blurLink={
              knowledgeActive ? "/images/Admin/dashboard-active.png" : "/images/Admin/dashboard.png"
            }
            containerClasses={"w-[20px] h-[20px]"}
          />
        </div>
        <p className={navClasses} style={{ fontSize: "20px" }}>Knowledge Base</p>
        {knowledgeActive && <MenuItemActive />}
      </button>
      <button
        type="button"
        className={dashboardActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/dashboard")}
        style={{ height: "60px", marginBottom: "5px" }}
      >
        <div className={dashboardActive ? iconActiveClasses : iconClasses}>
          <Media
            type="image"
            link="/images/Admin/dashboard.svg"
            blurLink={
              dashboardActive ? "/images/Admin/dashboard-active.png" : "/images/Admin/dashboard.png"
            }
            containerClasses={"w-[20px] h-[20px]"}
          />
        </div>
        <p className={navClasses} style={{ fontSize: "20px" }}>AIANA Admin</p>
        {dashboardActive && <MenuItemActive />}
      </button>
    </div>
  )
}

export default MenuList
