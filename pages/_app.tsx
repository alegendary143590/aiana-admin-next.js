import "react-toastify/dist/ReactToastify.css"
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css"
import type { AppProps } from "next/app"
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import { ToastContainer } from "react-toastify"
import * as React from "react"
import { Analytics } from "@vercel/analytics/react"
import TokenProvider from "@/providers/TokenContext"
import SideMenuProvider from "@/providers/SideMenuProvider"
import "../styles/globals.css"


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <TokenProvider >
      <NextIntlClientProvider 
        locale={router.locale}
        messages={pageProps.messages}
        timeZone="America/New_York"
      >
        <SideMenuProvider>
          <Component {...pageProps} />
          <ToastContainer />
          <Analytics />
        </SideMenuProvider>
      </NextIntlClientProvider>

    </TokenProvider>
  )
}
export default MyApp
