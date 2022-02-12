import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import {
  changeSeachText,
  getCatalogAsync,
  getCatalogMoreAsync,
  getCategoryAsync,
  getTopSalesAsync,
} from "../../../store/mainSlice"
import * as mainSelector from "../../../store/selectors"
import { RootState } from "../../../store/store"

const CatalogPage = ({ form = false }) => {
  const searchText = useSelector(mainSelector.getSearchText)
  const categoryData = useSelector((state: RootState) => state.main.category.value)
  // console.log("🚀 ~ file: CatalogPage.tsx ~ line 12 ~ CatalogPage ~ categoryData", categoryData)
  const catalogData = useSelector((state: RootState) => state.main.catalog.value)
  // console.log("🚀 ~ file: CatalogPage.tsx ~ line 12 ~ CatalogPage ~ catalogData", catalogData)
  const catalogIsFinish = useSelector((state: RootState) => state.main.catalog.isFinish)

  const [currentCategory, setCurrentCategory] = useState({ id: 0, title: "Все" })
  // console.log("🚀 ~ file: CatalogPage.tsx ~ line 17 ~ CatalogPage ~ currentCategory", currentCategory)
  const [targetCategory, setTargetCategory] = useState(null)
  // console.log("🚀 ~ file: CatalogPage.tsx ~ line 18 ~ CatalogPage ~ targetCategory", targetCategory)

  const [searchInput, setSearchInput] = useState(searchText)
  const [offset, setOffset] = useState(6)

  const dispatch = useDispatch()

  const moreClickHandler = (e: any) => {
    e.preventDefault()
    dispatch(getCatalogMoreAsync({ offset, categoryId: currentCategory.id }))
    setOffset((prev) => prev + 6)
  }

  useEffect(() => {
    dispatch(getCatalogAsync(currentCategory.id))
    setOffset(6)
  }, [currentCategory])

  useEffect(() => {
    setSearchInput(searchText)

    dispatch(getCatalogAsync(currentCategory.id))
  }, [searchText])

  useEffect(() => {
    dispatch(getCategoryAsync())
    dispatch(getTopSalesAsync())
    dispatch(getCatalogAsync(currentCategory.id))
  }, [])

  const categoryClickHandler: React.EventHandler<any> = (e) => {
    const categoryId = categoryData.find((item) => item?.title === e.target?.innerText)
    console.log("🚀 ~ file: CatalogPage.tsx ~ line 47 ~ CatalogPage ~ e.target.innerText", e.target?.innerText)
    setCurrentCategory(categoryId)
    setTargetCategory(e.target?.innerText)
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {form && (
        <form
          className="catalog-search-form form-inline"
          onSubmit={(e) => {
            e.preventDefault()
            // setSearchInput
            dispatch(changeSeachText(searchInput))
          }}
        >
          <input
            className="form-control"
            placeholder="Поиск"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      )}

      <ul className="catalog-categories nav justify-content-center">
        {categoryData.map((item) => (
          <li className="nav-item" key={item.id}>
            <Link
              to=""
              className={item.title === currentCategory.title ? "nav-link active" : "nav-link"}
              onClick={categoryClickHandler}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="row">
        {catalogData.map((item) => (
          <div className="col-4" key={item.id}>
            <div className="card catalog-item-card">
              <img
                src={item.images[0]}
                className="card-img-top img-fluid"
                alt={item.title}
                onError={(e: React.SyntheticEvent) =>
                  ((e.target as HTMLImageElement).src =
                    "https://xn--80aafzai5cj.xn--p1ai/wp-content/uploads/2021/05/placeholder.jpg")
                }
              />
              <div className="card-body">
                <p className="card-text">{item.title}</p>
                <p className="card-text">{item.price}</p>
                <NavLink to={`/products/${item.id}.html`} className="btn btn-outline-primary">
                  Заказать
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        {!catalogIsFinish ? (
          <button type="button" className="btn btn-outline-primary" onClick={moreClickHandler}>
            Загрузить ещё
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default CatalogPage
