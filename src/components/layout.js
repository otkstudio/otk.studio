import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"

const Layout = ({ children }) => {
  useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description

        }
      }
    }
  `)

  return <>
    <main>{children}</main>
  </>
}

export default Layout