import React from "react"
import Grid from "@mui/material/Grid"
import Media from "@/shared/Media"
import { ILayout } from "./types"
import StudioHeader from "../Header/StudioHeader"

const FullLayout = ({ children }: ILayout) => (
  <div
    className="
      min-h-screen w-screen
      overflow-hidden
      bg-cover bg-[bottom_right]
      bg-gray-100"
    > 
    <Grid container spacing={0}>
      <Grid item xs={7}>
        <div id="background" className="justify-center items-center flex h-full w-full p-[20px]  opacity-70">
          <Media
            type="image"
            link="/images/Landing/bg_1.png"
            blurLink="/images/Landing/bg_1.png"
            className="max-w-full max-h-full"
            containerClasses="w-full h-full"
          />
        </div>
      </Grid>
      <Grid item xs={5} className="flex h-full w-full">
        <div
          className="flex h-screen
          w-full flex-col bg-black_1 bg-gradient-to-b
          from-[#a1ea0400] from-0% right-0
          via-[#a1ea0405] via-75% to-[#a1ea041a]
          to-100% px-[60px] py-[2vh]"
          >
          <StudioHeader />
        <div className="flex h-full grow flex-col pt-[2.5vh]">{children}</div>
      </div>
      </Grid>
    </Grid>
  </div>
)

export default FullLayout
