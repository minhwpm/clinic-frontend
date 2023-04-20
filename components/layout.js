import { useState } from "react"
import Navbar from "./elements/navbar"
import Footer from "./elements/footer"
import NotificationBanner from "./elements/notification-banner"

const Layout = ({ children, global, pageContext }) => {
  const { navbar, footer, notificationBanner } = global.attributes

  return (
    <div className="flex flex-col justify-between min-h-screen ">
      {/* Aligned to the top */}
      <div className="flex-1">
        <Navbar
          navbar={navbar}
          notificationBanner={notificationBanner}
          pageContext={pageContext}
        />
        <div>{children}</div>
      </div>
      {/* Aligned to the bottom */}
      <Footer footer={footer} />
    </div>
  )
}

export default Layout
