import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { changeSeachText } from "../../../../store/mainSlice"

interface IProps {
  searchText: string
}

const SearchForm = ({ searchText }: IProps) => {
  const dispatch = useDispatch()

  const [searchInput, setSearchInput] = useState(searchText)

  useEffect(() => {
    setSearchInput(searchText)
  }, [searchText])

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
