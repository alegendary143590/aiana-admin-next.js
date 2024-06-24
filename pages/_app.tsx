import "../styles/globals.css"
import "react-toastify/dist/ReactToastify.css"
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css"
import type { AppProps } from "next/app"
import { ToastContainer } from "react-toastify"
import * as React from "react"
import { Analytics } from "@vercel/analytics/react"
import TokenProvider from "@/providers/TokenContext"



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TokenProvider >
        <Component {...pageProps} />
        <ToastContainer />
        <Analytics />
    </TokenProvider>
  )
}
export default MyApp
