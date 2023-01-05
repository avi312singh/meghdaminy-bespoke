import * as React from "react"
import "../styles.css"
import { Slice } from "gatsby"
interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  document.addEventListener("contextmenu", (event) => event.preventDefault())
  return (
    <>
      <Slice alias="header" />
      {children}
      <Slice alias="footer" />
    </>
  )
}

export default Layout
