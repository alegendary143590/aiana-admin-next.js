import React from "react"
import SideMenuProvider from "@/providers/SideMenuProvider"

import SideNavbar from "../SideNavBar"
import CountrySelect from "../LangSelect"
import Language from "../Language"
import AccountManagementDropdown from "../AccountDropMenu"
import { ILayout } from "./types"

const AdminLayout = ({ children }: ILayout) => (
  <div className="flex">
    <SideMenuProvider>
      <SideNavbar />

      <div className="w-screen h-screen overflow-auto">
        <div className="fixed w-full h-[85px] flex justify-end items-center space-x-5 py-5 pr-10 right-0 top-0 z-10 border-bottom bg-white">
          <CountrySelect countries={Language} />
          <AccountManagementDropdown />
        </div>
        <hr className="fixed w-full top-[85px] right-0 z-4" />
        <div className="mt-[85px]">
          {children}
        </div>
      </div>
    </SideMenuProvider>
  </div>
)

export default AdminLayout
