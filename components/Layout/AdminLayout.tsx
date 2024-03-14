import React from "react"
import SideMenuProvider from "@/providers/SideMenuProvider"
import { ILayout } from "./types"
import SeoHead from "../SeoHead"
import SideNavbar from "../SideNavBar"

const AdminLayout = ({ children }: ILayout) => (
  <div
    className="no-scrollbar relative flex
    h-screen w-screen bg-[#f8fafc]
    overflow-x-hidden bg-[100%_auto]"
    >
    <SeoHead
      title="AIANA"
      description="Create your own chatbot"
      image="/images/seo_logo.png"
      />
      <SideMenuProvider>
        <SideNavbar />
      </SideMenuProvider>
    <div className="no-scrollbar max-h-screen w-full overflow-y-auto">{children}</div>
  </div>
)

export default AdminLayout
