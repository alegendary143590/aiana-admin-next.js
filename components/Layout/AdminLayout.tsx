import React from "react"
import SideMenuProvider from "@/providers/SideMenuProvider"
import { ILayout } from "./types"
import SideNavbar from "../SideNavBar"

const AdminLayout = ({ children }: ILayout) => (
  <div
    className="no-scrollbar relative flex
    h-screen w-screen
    overflow-x-hidden bg-[100%_auto]"
  >
    <SideMenuProvider>
      <SideNavbar />
    </SideMenuProvider>
    <div className="no-scrollbar bg-[#f8f6f6] max-h-screen w-full overflow-y-auto">{children}</div>
  </div>
)

export default AdminLayout
