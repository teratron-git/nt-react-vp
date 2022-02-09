import React from "react"
import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { RootState } from "../../../store/store"

const TopSales = () => {
  const data = useSelector((state: RootState) => state.main.topSales.value)

  console.log("🚀 ~ file: TopSales.tsx ~ line 6 ~ TopSales ~ data", data)

  return data.length ? (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {data.map((item) => (
          <div className="col-4" key={item.id}>
            <div className="card">
              <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
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
    </section>
  ) : null
}

export default TopSales
