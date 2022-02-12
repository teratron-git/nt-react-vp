import { RootState } from "./store"

export const getSearchText = (state: RootState) => state.main.searchText
export const getCountOrders = (state: RootState) => state.main.countOrders
export const getProductInfo = (state: RootState) => state.main.productInfo.value
