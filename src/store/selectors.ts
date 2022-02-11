import { RootState } from "./store"

export const searchText = (state: RootState) => state.main.searchText
export const productInfo = (state: RootState) => state.main.productInfo.value
