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
import Preloader from "../Preloader"
import Catalog from "./Catalog"
import TopSales from "./TopSales"

interface IProps {
  top?: boolean
  form?: boolean
}

const CatalogPage = ({ form = false, top = true }: IProps) => {
  return (
    <>
      {top && <TopSales />}
      <Catalog form={form} />
    </>
  )
}

export default CatalogPage
