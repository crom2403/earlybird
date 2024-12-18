/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config } from "tailwindcss"

const svgToDataUri = require("mini-svg-data-uri")
// const colors = require("tailwindcss/colors")
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette")

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dark: {
          main_background: "#121212",
          main_foreground: "#ffffff",
        },
        light: {
          main_background: "#ffffff",
          main_foreground: "#000000",
        },
        board: {
          blue: {
            border: "#0e538c",
            text: "#0e538c",
            background: "#cbe4ff",
            bg_button: "#d9ebff",
          },
          green: {
            border: "#2e7d32", // Màu xanh lá cây đậm
            text: "#2e7d32", // Màu xanh lá cây đậm cho văn bản
            background: "#c8e6c9", // Màu nền xanh lá cây nhạt
            bg_button: "#e0f2f1", // Màu nền nút xanh lá cây nhạt hơn
          },
          orange: {
            border: "#d5710d",
            text: "#d5710d",
            background: "#fae6cb",
            bg_button: "#f9f5e9",
          },
          violet: {
            border: "#6a1b9a", // Màu violet đậm
            text: "#6a1b9a", // Màu violet đậm cho văn bản
            background: "#e1bee7", // Màu nền violet nhạt
            bg_button: "#f3e5f5", // Màu nền nút violet nhạt hơn
          },
          pink: {
            border: "#d81b60", // Màu hồng đậm
            text: "#d81b60", // Màu hồng đậm cho văn bản
            background: "#f8bbd0", // Màu nền hồng nhạt
            bg_button: "#fce4e1", // Màu nền nút hồng nhạt hơn
          },
          red: {
            border: "#c62828", // Màu đỏ đậm
            text: "#c62828", // Màu đỏ đậm cho văn bản
            background: "#ef9a9a", // Màu nền đỏ nhạt
            bg_button: "#f2b2b2", // Màu nền nút đỏ nhạt hơn
          },
          mint: {
            border: "#4db6ac", // Màu mint đậm
            text: "#4db6ac", // Màu mint đậm cho văn bản
            background: "#b2dfdb", // Màu nền mint nhạt
            bg_button: "#e0f2f1", // Màu nền nút mint nhạt hơn
          },
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      )
    },
  ],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"))
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ":root": newVars,
  })
}
export default config
