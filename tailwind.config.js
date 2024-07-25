/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

const dropShadows = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
}

const flattenColorPalette = (colors, parentKey = "") =>
  Object.keys(colors).reduce((acc, key) => {
    const value = colors[key]
    const prefixedKey = parentKey ? `${parentKey}-${key}` : key

    if (typeof value === "string") {
      acc[prefixedKey] = value
    } else if (typeof value === "object") {
      Object.assign(acc, flattenColorPalette(value, prefixedKey))
    }

    return acc
  }, {})

const dropShadowColorPlugin = plugin(({ matchUtilities, theme }) => {
  const flatColors = flattenColorPalette(theme("colors"))
  matchUtilities(
    {
      "drop-shadow": (value) => ({
        "--tw-drop-shadow-color": value,
      }),
    },
    { values: flatColors },
  )
})

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    dropShadow: Object.fromEntries(
      Object.entries(dropShadows).map(([key, value]) => [
        key,
        `0px 0px ${value}px var(--tw-drop-shadow-color)`,
      ]),
    ),
    extend: {
      fontFamily: {
        urwgeometric: ["URWGeometric ", "sans-serif"],
        urwgeometric_regular: ["URWGeometric Regular", "sans-serif"],
        urwgeometric_light: ["URWGeometric Light", "sans-serif"],
        urwgeometric_medium: ["URWGeometric Medium", "sans-serif"],
        urwgeometric_semibold: ["URWGeometric SemiBold", "sans-serif"],
        urwgeometric_bold: ["URWGeometric Bold", "sans-serif"],
        boxicons: ["Box Icons", "sans-serif"],
        dropicons: ["Drop Icons", "sans-serif"],
        fabrands: ["Fabrands", "sans-serif"],
        material: ["Material Design Icons", "sans-serif"],
        login_font: ["Be Vietnam", "sans-serif"],
      },
      screens: {
        ios: "320px",
        samsungS8: "360px",
        xs: "390px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      boxShadow: {
        black_shadow: "0px 0px 24px 0px #000",
        gray_overlay_3_shadow: "0px 12px 24px 0px #0000003d",
        session_shadow: "0px 0px 24px 0px rgba(161, 234, 4, 0.4)",
        session_shadow_120: "0px 0px 120px 0px rgba(161, 234, 4, 0.12)",
      },
      backgroundImage: {
        gradient_s_overlay_1:
          "linear-gradient(90deg, rgba(161, 234, 4, 0.2) 0%, rgba(161, 234, 4, 0) 30%)",
        gradient_p_overlay_1:
          "linear-gradient(90deg, rgba(255, 106, 43, 0.2) 0%, rgba(255, 106, 43, 0) 30%)",
        "grad-full": "linear-gradient(270deg, rgba(161, 234, 4, 0.2) 0%, rgba(161, 234, 4, 0) 30%)",
        gradient_s_1:
          "linear-gradient(270deg, rgba(161, 234, 4, 1) -0.02%, rgba(218, 235, 2, 1) 100.01%)",
        gradient_s_2:
          "linear-gradient(90deg, rgba(7, 14, 11, 1) 0%, rgba(162, 58, 249, 0.8) 100%)",
        gradient_p_1:
          "linear-gradient(270deg, rgba(255, 106, 43, 1) -0.02%, rgba(255, 68, 43, 1) 100.01%)",
        gradient_p_2:
          "linear-gradient(270deg, rgba(255, 106, 43, 0.2) -0.02%, rgba(255, 68, 43, 0.2) 100.01%)",
      },
    },
  },
  variants: {
    extend: {
      display: ["dark"],
    },
  },
  darkMode: ["class"],
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    dropShadowColorPlugin,
  ],
}
