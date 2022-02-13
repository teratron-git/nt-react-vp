import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { changeSeachText } from "../../store/mainSlice"
import * as mainSelector from "../../store/selectors"
import { RootState } from "../../store/store"

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getSearchText = useSelector(mainSelector.getSearchText)
  const getCountOrders = useSelector(mainSelector.getCountOrders)

  const [isSearchExpend, setIsSearchExpend] = useState(false)
  const [searchInput, setSearchInput] = useState(getSearchText)
  const [countOrders, setCountOrders] = useState(getCountOrders)

  useEffect(() => {
    setCountOrders(JSON.parse(localStorage.getItem("order"))?.length)
  }, [getCountOrders])

  const serchInputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInput(e.target.value)
  }

  const searchButtonClickHandler = (e: any) => {
    e.preventDefault()
    setIsSearchExpend(!isSearchExpend)

    if (searchInput) {
      setSearchInput("")
      setIsSearchExpend(false)
      dispatch(changeSeachText(searchInput))
      navigate("/catalog.html")
    }
  }

  const cartClickHandler = () => {
    navigate("/cart.html")
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
              <img src="/img/header-logo.png" alt="BosNavLink Noga" />
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
                  <div className="header-controls-pic header-controls-cart" onClick={cartClickHandler}>
                    {countOrders ? <div className="header-controls-cart-full">{countOrders}</div> : null}
                    <div className="header-controls-cart-menu" />
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className={`header-controls-search-form form-inline ${!isSearchExpend && "invisible"}`}
                  onSubmit={searchButtonClickHandler}
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
