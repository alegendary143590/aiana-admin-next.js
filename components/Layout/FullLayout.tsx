import React from "react"
import { ILayout } from "./types"
import SeoHead from "../SeoHead"
import Grid from '@mui/material/Grid';
import StudioHeader from "../Header/StudioHeader"
import CardMedia from '@mui/material/CardMedia';


const FullLayout = ({ children }: ILayout) => (
  <div
    className="
    min-h-screen w-screen
    overflow-hidden bg-white-300
    bg-cover bg-[bottom_right]"
    style={{backgroundColor: "#fff"}}
  > 
    <SeoHead
      title="SESSION"
      description="Book your next studio session today"
      image="/images/seo_logo.png"
    />
    <Grid container spacing={0} className="h-screen w-screen">
      <Grid item xs={7} className="flex h-full w-full">
      <div id="background" className="left-0">
        
      </div>

      </Grid>
      <Grid item xs={5} className="flex h-full w-full">
      <div
        className="flex h-screen
        w-[640px] flex-col bg-black_0 bg-gradient-to-b
        from-[#a1ea0400] from-0% absolute right-0
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
