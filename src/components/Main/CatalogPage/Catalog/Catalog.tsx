import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import {
  changeSeachText,
  getCatalogAsync,
  getCatalogMoreAsync,
  getCategoryAsync,
  getTopSalesAsync,
  ICard,
  ICategory,
  IStatus,
} from "../../../../store/mainSlice"
import * as mainSelector from "../../../../store/selectors"
import Preloader from "../../Preloader"
import SearchForm from "../SearchForm"

interface IProps {
  catalogStatus: IStatus
  catalogData: ICard[]
  categoryStatus: IStatus
  categoryData: ICategory[]
  isCatalogFinish: boolean
  searchText: string
  form?: boolean
}

const Catalog = ({
  form = false,
  catalogStatus,
  catalogData,
  categoryStatus,
  categoryData,
  isCatalogFinish,
  searchText,
}: IProps) => {
  const dispatch = useDispatch()

  const [currentCategory, setCurrentCategory] = useState({ id: 0, title: "Все" })
  const [targetCategory, setTargetCategory] = useState(null)

  const [offset, setOffset] = useState(6)

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
    dispatch(getCategoryAsync())
    dispatch(getTopSalesAsync())
    dispatch(getCatalogAsync(currentCategory.id))
  }, [])

  useEffect(() => {
    dispatch(getCatalogAsync(currentCategory.id))
  }, [searchText])

  const categoryClickHandler: React.EventHandler<any> = (e) => {
    // console.log("🚀 ~ file: CatalogPage.tsx ~ line 47 ~ CatalogPage ~ e.target.innerText", e.target?.innerText)

    const categoryId = categoryData.find((item) => item?.title === e.target?.innerText)
    setCurrentCategory(categoryId)
    setTargetCategory(e.target?.innerText)
  }

  return (
    <>
      {catalogStatus === "loading" || categoryStatus === "loading" ? (
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>
          <Preloader />
        </section>
      ) : (
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>

          {form && <SearchForm searchText={searchText} currentCategoryId={currentCategory.id} />}

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
            {!isCatalogFinish ? (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={moreClickHandler}
                // disabled={Boolean(catalogStatus !== "success")}
              >
                Загрузить ещё
              </button>
            ) : null}
          </div>
        </section>
      )}
    </>
  )
}

export default Catalog
