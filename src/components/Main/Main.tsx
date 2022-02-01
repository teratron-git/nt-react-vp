import React from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import AboutPage from "./AboutPage"
import CatalogPage from "./CatalogPage"
import ContactsPage from "./ContactsPage"
import Page404 from "./Page404"
import TopSales from "./TopSales/TopSales"

const Main = () => {
  const navigate = useNavigate()

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src="./img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TopSales />
                  <CatalogPage />
                </>
              }
            />
            <Route path="/about.html" element={<AboutPage />} />
            <Route path="/catalog.html" element={<CatalogPage form />} />
            <Route path="/contacts.html" element={<ContactsPage />} />
            <Route path="*" element={<Page404 />} />
            {/* <Route path="*">{navigate("/404")}</Route> */}
          </Routes>
        </div>
      </div>
    </main>
  )
}

export default Main