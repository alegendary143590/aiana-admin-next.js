import React from "react"
import Media from "@/shared/Media"
import { ILayout } from "./types"
import SeoHead from "../SeoHead"
import Header from "../Header"

const AuthLayout = ({ children }: ILayout) => (
  <div
    className="relative flex
    min-h-screen w-screen
    overflow-hidden
    bg-cover bg-[bottom_right]"
  >
    <SeoHead
      title="AIANA"
      description="Create your own chatbot"
      image="/images/seo_logo.png"
    />
    <div className="flex h-screen w-7/12 flex-col opacity-70">
        <Media
            type="image"
            link="/images/Landing/bg.png"
            blurLink="/images/Landing/bg.png"
            containerClasses="h-full p-3"
        />
    </div>
    <div
      className="flex h-screen
      w-5/12 flex-col bg-black_0 bg-gradient-to-b
      from-[#a1ea0400] from-0%
      via-[#a1ea0405] via-75% to-[#a1ea041a]
      to-100% px-[60px] py-[2vh]"
    >
      <Header />
      <div className="flex h-full grow flex-col pt-[2.5vh]">{children}</div>
    </div>
  </div>
)

export default AuthLayout
