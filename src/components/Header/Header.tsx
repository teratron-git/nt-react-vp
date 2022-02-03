import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

const Header = () => {
  const [isSearchExpend, setIsSearchExpend] = useState(false)
  const [searchInput, setSearchInput] = useState("")

  const navigate = useNavigate()

  const serchInputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInput(e.target.value)
  }

  const searchButtonClickHandler = () => {
    setIsSearchExpend(!isSearchExpend)

    if (searchInput) {
      setSearchInput("")
      setIsSearchExpend(false)
      navigate("/catalog.html")
    }
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
              <img src="./img/header-logo.png" alt="BosNavLink Noga" />
            </NavLink>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Главная
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/catalog.html">
                    Каталог
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about.html">
                    О магазине
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contacts.html">
                    Контакты
                  </NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={searchButtonClickHandler}
                  />
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu" />
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className={`header-controls-search-form form-inline ${!isSearchExpend && "invisible"}`}
                >
                  <input className="form-control" placeholder="Поиск" value={searchInput} onChange={serchInputChangeHandler} />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
