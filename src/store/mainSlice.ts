import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { AppThunk, RootState } from "./store"

export interface ICard {
  id: number
  category: number
  title: string
  price: number
  images: string[]
}

type IStatus = "idle" | "loading" | "success" | "error"

export interface ICategory {
  id: number
  title: string
}
export interface IProductInfoValue {
  id: number
  category: number
  title: string
  images: Array<string>
  sku: string
  manufacturer: string
  color: string
  material: string
  reason: string
  season: string
  heelSize: string
  price: number
  oldPrice: number
  sizes: Array<{ size: string; avalible: boolean }>
}

export interface IProductInfo {
  value: IProductInfoValue
  status: IStatus
}

export interface IProductInfoForCart extends IProductInfoValue {
  amount?: number
  size?: string
}

interface IMainState {
  searchText: string
  countOrders: string
  topSales: {
    value: ICard[]
    status: IStatus
  }
  category: {
    value: ICategory[]
    status: IStatus
  }
  catalog: {
    value: ICard[]
    status: IStatus
    isFinish: boolean
  }
  productInfo: IProductInfo
  order: {
    value: any
    status: IStatus
  }
}

const initialState: IMainState = {
  searchText: "",
  countOrders: null,
  topSales: {
    value: [],
    status: "idle",
  },
  category: {
    value: [],
    status: "idle",
  },
  catalog: {
    value: [],
    status: "idle",
    isFinish: false,
  },
  productInfo: {
    value: null,
    status: "idle",
  },
  order: {
    value: null,
    status: "idle",
  },
}

export const getCategoryAsync = createAsyncThunk("main/getCategoryAsync", async () => {
  const response = await axios("http://localhost:7070/api/categories")

  return response.data
})

export const getTopSalesAsync = createAsyncThunk("main/getTopSalesAsync", async () => {
  const response = await axios("http://localhost:7070/api/top-sales")

  return response.data
})

export const getCatalogAsync = createAsyncThunk("main/getCatalogAsync", async (categoryId: number, { getState }) => {
  const { searchText } = (getState() as RootState).main

  const response = await axios(
    !categoryId
      ? `http://localhost:7070/api/items?q=${searchText}`
      : `http://localhost:7070/api/items?categoryId=${categoryId}&q=${searchText}`
  )

  return response.data
})

export const getCatalogMoreAsync = createAsyncThunk(
  "main/getCatalogMoreAsync",
  async ({ offset, categoryId }: { offset: number; categoryId: number }, { getState }) => {
    const { searchText } = (getState() as RootState).main

    const response = await axios(`http://localhost:7070/api/items?offset=${offset}&categoryId=${categoryId}&q=${searchText}`)

    return response.data
  }
)

export const getProductInfoById = createAsyncThunk("main/getProductInfoById", async (id: number) => {
  const response = await axios(`http://localhost:7070/api/items/${id}`)

  return response.data
})

export const setOrder = createAsyncThunk("main/setOrder", async (body: any) => {
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
  const response = await axios.post(`http://localhost:7070/api/order`, body)

  return response.data
})

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeSeachText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
    getCountOrders: (state, action: PayloadAction<string>) => {
      state.countOrders = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryAsync.pending, (state) => {
        state.category.status = "loading"
        state.category.value = []
      })
      .addCase(getCategoryAsync.fulfilled, (state, action) => {
        state.category.status = "success"
        state.category.value.push({ id: 0, title: "Все" })
        state.category.value.push(...action.payload)
      })

      .addCase(getTopSalesAsync.pending, (state) => {
        state.topSales.status = "loading"
      })
      .addCase(getTopSalesAsync.fulfilled, (state, action) => {
        state.topSales.status = "success"
        state.topSales.value = action.payload
      })

      .addCase(getCatalogAsync.pending, (state) => {
        state.catalog.value = []
        state.catalog.status = "loading"
      })
      .addCase(getCatalogAsync.fulfilled, (state, action) => {
        state.catalog.isFinish = false
        state.catalog.status = "success"
        state.catalog.value = action.payload
      })

      .addCase(getCatalogMoreAsync.pending, (state) => {
        state.catalog.status = "loading"
      })
      .addCase(getCatalogMoreAsync.fulfilled, (state, action) => {
        state.catalog.status = "success"
        state.catalog.isFinish = action.payload.length !== 6
        state.catalog.value.push(...action.payload)
      })

      .addCase(getProductInfoById.pending, (state) => {
        state.productInfo.status = "loading"
        state.productInfo.value = null
      })
      .addCase(getProductInfoById.fulfilled, (state, action) => {
        state.productInfo.status = "success"
        state.productInfo.value = { ...action.payload }
      })

      .addCase(setOrder.pending, (state) => {
        state.order.status = "loading"
        state.order.value = null
      })
      .addCase(setOrder.fulfilled, (state, action) => {
        state.order.status = "success"
        state.order.value = { ...action.payload }
      })
  },
})

export const { changeSeachText, getCountOrders } = mainSlice.actions

export default mainSlice.reducer
