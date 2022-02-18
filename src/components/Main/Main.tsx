import { Navigate, Route, Routes } from "react-router-dom"
import AboutPage from "./AboutPage"
import CartPage from "./CartPage"
import CatalogPage from "./CatalogPage"
import ContactsPage from "./ContactsPage"
import Page404 from "./Page404"
import ProductInfoPage from "./ProductInfoPage"

const Main = () => {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src="/img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/about.html" element={<AboutPage />} />
            <Route path="/catalog.html" element={<CatalogPage form top={false} />} />
            <Route path="/contacts.html" element={<ContactsPage />} />
            <Route path="/cart.html" element={<CartPage />} />
            <Route path="/products/:id.html" element={<ProductInfoPage />} />
            <Route path="/404.html" element={<Page404 />} />
            <Route path="*" element={<Navigate replace to="/404.html" />} />
          </Routes>
        </div>
      </div>
    </main>
  )
}

export default Main
