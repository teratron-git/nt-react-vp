import { RootState } from "./store"

export const getSearchText = (state: RootState) => state.main.searchText
export const getCountOrders = (state: RootState) => state.main.countOrders
export const getProductInfo = (state: RootState) => state.main.productInfo.value

export const getOrderStatus = (state: RootState) => state.main.order.status

export const getTopSalesValue = (state: RootState) => state.main.topSales.value
export const getTopSalesStatus = (state: RootState) => state.main.topSales.status

export const getCatalogValue = (state: RootState) => state.main.catalog.value
export const getCatalogStatus = (state: RootState) => state.main.catalog.status
export const getCatalogIsFinish = (state: RootState) => state.main.catalog.isFinish

export const getCategoryValue = (state: RootState) => state.main.category.value
