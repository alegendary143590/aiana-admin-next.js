import { useRouter } from "next/router"
import { useState } from "react"

export enum SIDE_NAVS {
  DASHBOARD = "DASHBOARD",
  CALENDAR = "CALENDAR",
  SESSION_REQUESTS = "SESSION_REQUESTS",
  PROJECT_REQUESTS = "PROJECT_REQUESTS",
}

const useSideNavbar = () => {
  const navClasses = "text-gray_2 text-[14px] font-urwgeometric_medium mt-[-7px]"
  const iconActiveClasses = `w-[32px] aspect-[1/1] flex justify-center items-center
      rounded-full relative z-[2]`
  const iconClasses = `w-[32px] aspect-[1/1] flex justify-center items-center
      rounded-full bg-gray_overlay_6`
  const navContainerClasses = `relative z-[2] flex gap-x-[8px] w-full items-center py-[8px] px-[18px] p-3 cursor-pointer bg-gray_overlay_3`
  const navActiveContainerClasses = `relative z-[2] flex gap-x-[8px] w-full items-center py-[8px] p-3 bg-[#e6f2ff] px-[18px] cursor-pointer`

  const { pathname } = useRouter()
  const dashboardActive = pathname.includes("/dashboard")
  const createActive = pathname.includes("/chatbot")
  const profileActive = pathname.includes("/admin")
  const knowledgeActive = pathname.includes("/knowledge")
  const reviewsActive = pathname.includes("/reviews")
  const ticketsActive = pathname.includes("/tickets")
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
    dashboardActive,
    createActive,
    reviewsActive,
    requestActive,
    ticketsActive,
    sessionRequestsActive,
    projectRequestsActive,
    activeProjectsActive,
  }
}

export default useSideNavbar
