import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCatalogAsync, getCatalogMoreAsync, getCategoryAsync, getTopSalesAsync } from "../../../store/mainSlice"
import * as mainSelector from "../../../store/selectors"
import { RootState } from "../../../store/store"

const CatalogPage = ({ form = false }) => {
  const searchText = useSelector(mainSelector.searchText)

  const [searchInput, setSearchInput] = useState("")
  const [offset, setOffset] = useState(6)
  const categoryData = useSelector((state: RootState) => state.main.category.value)
  const catalogData = useSelector((state: RootState) => state.main.catalog.value)
  console.log("🚀 ~ file: CatalogPage.tsx ~ line 7 ~ categoryData ~ data", categoryData)

  const dispatch = useDispatch()

  const moreClickHandler = () => {
    dispatch(getCatalogMoreAsync(offset))
    setOffset((prev) => prev + 6)
  }

  useEffect(() => {
    setSearchInput(searchText)
  }, [searchText])

  useEffect(() => {
    dispatch(getCategoryAsync())
    dispatch(getTopSalesAsync())
    dispatch(getCatalogAsync())
  }, [])

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {form && (
        <form className="catalog-search-form form-inline">
          <input
            className="form-control"
            placeholder="Поиск"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      )}

      <ul className="catalog-categories nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Все
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Женская обувь
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Мужская обувь
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Обувь унисекс
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Детская обувь
          </a>
        </li>
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
                <a href="/products/1.html" className="btn btn-outline-primary">
                  Заказать
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button type="button" className="btn btn-outline-primary" onClick={moreClickHandler}>
          Загрузить ещё
        </button>
      </div>
    </section>
  )
}

export default CatalogPage
