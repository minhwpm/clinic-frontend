import { createContext } from "react"
import Navbar from "./elements/navbar"
import Footer from "./elements/footer"

export const PageContext = createContext(null)

const Layout = ({ children, global, pageContext }) => {
  const { navbar, footer, notificationBanner } = global.attributes

  return (
    <PageContext.Provider value={pageContext}>
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
    </PageContext.Provider>
  )
}

export default Layout
