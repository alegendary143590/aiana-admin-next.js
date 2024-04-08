import React from "react"
import { ILayout } from "./types"
import SeoHead from "../SeoHead"
import MobileHeader from "../Header/MobileHeader"

const MobileLayout = ({ children }: ILayout) => (
  <div
    className="relative h-screen w-screen
    bg-black_0 
    bg-cover bg-[bottom_right]"
  >
    <SeoHead
      title="AIANA"
      description="Create your own chatbot"
      image="/images/seo_logo.png"
    />
    <MobileHeader />
    <div
      className="flex-grow h-screen w-screen
      justify-between px-[60px] py-[2vh] pt-[100px]"
    >
      {children}
    </div>
  </div>
)

export default MobileLayout
