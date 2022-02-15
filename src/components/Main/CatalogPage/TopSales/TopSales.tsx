import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { ICard, IStatus } from "../../../../store/mainSlice"
import * as mainSelector from "../../../../store/selectors"
import { RootState } from "../../../../store/store"
import Preloader from "../../Preloader"

interface IProps {
  topSalesStatus: IStatus
  topSalesData: ICard[]
}

const TopSales = ({ topSalesStatus, topSalesData }: IProps) => {
  return (
    <>
      {topSalesStatus === "loading" ? (
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          <Preloader />
        </section>
      ) : topSalesData.length ? (
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          <div className="row">
            {topSalesData.map((item) => (
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
      ) : null}
    </>
  )
}

export default TopSales
