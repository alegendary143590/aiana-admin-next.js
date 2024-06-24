import React from "react"
import SideMenuProvider from "@/providers/SideMenuProvider"
import { ILayout } from "./types"
import SideNavbar from "../SideNavBar"

const AdminLayout = ({ children }: ILayout) => (
  <div
    className="flex"
  >
    <SideMenuProvider>
      <SideNavbar />
    </SideMenuProvider>
    <div className="w-screen">{children}</div>
  </div>
)

export default AdminLayout
