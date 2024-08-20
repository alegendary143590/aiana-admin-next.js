import "react-toastify/dist/ReactToastify.css"
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css"
import type { AppProps } from "next/app"
import { ToastContainer } from "react-toastify"
import * as React from "react"
import { Analytics } from "@vercel/analytics/react"
import TokenProvider from "@/providers/TokenContext"
import SideMenuProvider from "@/providers/SideMenuProvider"
import "../styles/globals.css"


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <TokenProvider >
      <SideMenuProvider>
        <Component {...pageProps} />
        <ToastContainer />
        <Analytics />
      </SideMenuProvider>

    </TokenProvider>
  )
}
export default MyApp
