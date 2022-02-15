import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { changeSeachText, getCatalogAsync } from "../../../../store/mainSlice"
import * as mainSelector from "../../../../store/selectors"
import Preloader from "../../Preloader"

interface IProps {
  searchText: string
  currentCategoryId: number
}

const SearchForm = ({ searchText, currentCategoryId }: IProps) => {
  const dispatch = useDispatch()

  const [searchInput, setSearchInput] = useState(searchText)

  useEffect(() => {
    setSearchInput(searchText)
  }, [searchText])

  // useEffect(() => {
  //   return () => {
  //     dispatch(changeSeachText(""))
  //   }
  // }, [searchText])

  return (
    <form
      className="catalog-search-form form-inline"
      onSubmit={(e) => {
        e.preventDefault()
        dispatch(changeSeachText(searchInput))
      }}
    >
      <input className="form-control" placeholder="Поиск" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
    </form>
  )
}

export default SearchForm
