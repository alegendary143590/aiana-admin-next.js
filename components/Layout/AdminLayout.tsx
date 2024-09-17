import React from "react"

import SideNavbar from "../SideNavBar"
import AccountManagementDropdown from "../AccountDropMenu"
import { ILayout } from "./types"

const AdminLayout = ({ children }: ILayout) => (
  <div className="flex">
    <SideNavbar />
    <div className="w-screen h-screen overflow-auto">
      <div className="fixed w-full h-[85px] flex justify-end items-center space-x-5 py-5 pr-10 right-0 top-0 z-10 border-bottom bg-white">
        <AccountManagementDropdown />
      </div>
      <hr className="fixed w-full top-[85px] right-0 z-4" />
      <div className="pt-[85px] h-full">
        {children}
      </div>
    </div>
  </div>
)

export default AdminLayout
