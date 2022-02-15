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
  const getSearchText = useSelector(mainSelector.getSearchText)

  const getTopSalesValue = useSelector(mainSelector.getTopSalesValue)
  const getTopSalesStatus = useSelector(mainSelector.getTopSalesStatus)

  const getCategoryValue = useSelector(mainSelector.getCategoryValue)
  const getCategoryStatus = useSelector(mainSelector.getCategoryStatus)

  const getCatalogValue = useSelector(mainSelector.getCatalogValue)
  const getCatalogStatus = useSelector(mainSelector.getCatalogStatus)
  const getCatalogIsFinish = useSelector(mainSelector.getCatalogIsFinish)

  const [currentCategory, setCurrentCategory] = useState({ id: 0, title: "Все" })
  const [targetCategory, setTargetCategory] = useState(null)

  const [searchInput, setSearchInput] = useState(getSearchText)
  const [offset, setOffset] = useState(6)

  return (
    <>
      {top && <TopSales topSalesStatus={getTopSalesStatus} topSalesData={getTopSalesValue} />}

      <Catalog
        catalogStatus={getCatalogStatus}
        catalogData={getCatalogValue}
        categoryData={getCategoryValue}
        categoryStatus={getCategoryStatus}
        isCatalogFinish={getCatalogIsFinish}
        searchText={getSearchText}
        form={form}
      />
    </>
  )
}

export default CatalogPage
