import { keyframes, style } from "@vanilla-extract/css"
import { theme } from "../theme.css"

const socialFadeIn = keyframes({
  "0%": { opacity: "0" },
  "66%": { opacity: "0" },
  "100%": { opacity: "1" },
})

const emailFadeIn = keyframes({
  "0%": { opacity: "0" },
  "86%": { opacity: "0" },
  "100%": { opacity: "1" },
})

const numberFadeIn = keyframes({
  "0%": { opacity: "0" },
  "96%": { opacity: "0" },
  "100%": { opacity: "1" },
})

export const heading = style({
  fontFamily: theme.fonts.mono,
  fontStyle: "normal",
  letterSpacing: "-0.02em",
})

export const text = style({
  fontSize: theme.fontSizes[4],
  textAlign: "center",
  marginBottom: 0,
})

export const socialLink = style({
  animationName: socialFadeIn,
  animationDuration: "3s",
})

export const email = style({
  textDecoration: "none",
  animationName: emailFadeIn,
  animationDuration: "3s",
  "a:-webkit-any-link": {
    textDecoration: "none",
  },
})

export const number = style({
  textDecoration: "none",
  animationName: numberFadeIn,
  animationDuration: "3.5s",
  "a:-any-link": {
    textDecoration: "none",
  },
})
