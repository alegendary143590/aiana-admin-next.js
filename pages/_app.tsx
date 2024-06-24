import "../styles/globals.css"
import "react-toastify/dist/ReactToastify.css"
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css"
import type { AppProps } from "next/app"
import { ToastContainer } from "react-toastify"
import * as React from "react"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import TokenProvider from "@/providers/TokenContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TokenProvider >
      <ThemeProvider theme={theme} >
        <Component {...pageProps} />
        <ToastContainer />
        <Analytics />
      </ThemeProvider>
    </TokenProvider>
  )
}
export default MyApp
