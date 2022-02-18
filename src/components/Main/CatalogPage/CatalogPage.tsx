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
