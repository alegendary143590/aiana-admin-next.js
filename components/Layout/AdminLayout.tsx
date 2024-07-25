import React from "react"
import SideMenuProvider from "@/providers/SideMenuProvider"
import SideNavbar from "../SideNavBar"
import CountrySelect from "../LangSelect"
import Language from "../Language"
import { FaBell } from "react-icons/fa"
import { ILayout } from "./types"

const AdminLayout = ({ children }: ILayout) => (
  <div className="flex">
    <SideMenuProvider>
      <SideNavbar />
    </SideMenuProvider>
    <div className="w-screen">
      <div className="flex justify-end">
        <CountrySelect countries={Language} />
        <div>
          <FaBell color="#A536FA" />
        </div>
      </div>
      {children}
    </div>
  </div>
)

export default AdminLayout
