import { useRouter } from "next/router"
import { useState } from "react"

export enum SIDE_NAVS {
  DASHBOARD = "DASHBOARD",
  CALENDAR = "CALENDAR",
  SESSION_REQUESTS = "SESSION_REQUESTS",
  PROJECT_REQUESTS = "PROJECT_REQUESTS",
}

const useSideNavbar = () => {
  const navClasses = "text-gray_2 text-[14px]"
  const iconActiveClasses = `w-[32px] aspect-[1/1] flex justify-center items-center
      rounded-full relative z-[2]`
  const iconClasses = `w-[32px] aspect-[1/1] flex justify-center items-center
      rounded-full bg-gray_overlay_6`
  const navContainerClasses = `relative border-l-4 border-transparent z-[2] flex gap-x-[8px] w-full items-center sm:py-[8px] py-[4px] px-[18px] cursor-pointer`
  const navActiveContainerClasses = `relative z-[5] border-l-4 flex gap-x-[8px] w-full items-center sm:py-[8px] py-[4px] px-[18px] bg-gradient_s_2 cursor-pointer border-[#A23AF9]`

  const { pathname } = useRouter()
  const dashboardPageActive = pathname.includes("/dashboardpage")
  const usersActive = pathname.includes("/users")
  const createActive = pathname.includes("/chatbot")
  const profileActive = pathname.includes("/admin")
  const knowledgeActive = pathname.includes("/knowledge")
  const reviewsActive = pathname.includes("/reviews")
  const ticketsActive = pathname.includes("/tickets")
  const dashboardActive = pathname.includes("/dashboard")
  const helpActive = pathname.includes("/help")
  const settingsActive = pathname.includes("/settings")
  const sessionRequestsActive = pathname.includes("/session-requests")
  const projectRequestsActive = pathname.includes("/project-requests")
  const requestActive = sessionRequestsActive || projectRequestsActive
  const activeProjectsActive = pathname.includes("/active-projects")

  const [selectedNav, setSelectedNav] = useState()

  return {
    navActiveContainerClasses,
    iconActiveClasses,
    iconClasses,
    navContainerClasses,
    navClasses,
    selectedNav,
    knowledgeActive,
    setSelectedNav,
    profileActive,
    helpActive,
    settingsActive,
    dashboardPageActive,
    dashboardActive,
    createActive,
    reviewsActive,
    requestActive,
    ticketsActive,
    usersActive,
    sessionRequestsActive,
    projectRequestsActive,
    activeProjectsActive,
  }
}

export default useSideNavbar
