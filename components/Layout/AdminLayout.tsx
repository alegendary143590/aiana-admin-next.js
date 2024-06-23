import React from "react"
import SideMenuProvider from "@/providers/SideMenuProvider"
import { ILayout } from "./types"
import SideNavbar from "../SideNavBar"

const AdminLayout = ({ children }: ILayout) => (
  <div
    className="relative flex
    h-screen w-screen
     bg-[100%_auto]"
  >
    <SideMenuProvider>
      <SideNavbar />
    </SideMenuProvider>
    <div className="bg-[#f8f6f6] w-full h-full overflow-hidden">{children}</div>
  </div>
)

export default AdminLayout
