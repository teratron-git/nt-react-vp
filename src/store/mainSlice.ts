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

export type IStatus = "idle" | "loading" | "success" | "error"

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

export const setOrder = createAsyncThunk("main/setOrder", async (body: any, { dispatch }) => {
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
    changeCountOrders: (state, action: PayloadAction<string>) => {
      state.countOrders = action.payload
    },

    setOrderStatus: (state, action: PayloadAction<IStatus>) => {
      state.order.status = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryAsync.pending, (state) => {
        state.category.status = "loading"
        state.category.value = []
      })
      .addCase(getCategoryAsync.rejected, (state) => {
        state.category.status = "error"
        state.category.value = []
      })
      .addCase(getCategoryAsync.fulfilled, (state, action: PayloadAction<Array<ICategory>>) => {
        state.category.status = "success"
        state.category.value.push({ id: 0, title: "Все" })
        state.category.value.push(...action.payload)
      })

      .addCase(getTopSalesAsync.pending, (state) => {
        state.topSales.status = "loading"
      })
      .addCase(getTopSalesAsync.rejected, (state) => {
        state.topSales.status = "error"
      })
      .addCase(getTopSalesAsync.fulfilled, (state, action: PayloadAction<Array<ICard>>) => {
        state.topSales.status = "success"
        state.topSales.value = action.payload
      })

      .addCase(getCatalogAsync.pending, (state) => {
        state.catalog.status = "loading"
        state.catalog.value = []
      })
      .addCase(getCatalogAsync.rejected, (state) => {
        state.catalog.status = "error"
        state.catalog.value = []
      })
      .addCase(getCatalogAsync.fulfilled, (state, action: PayloadAction<Array<ICard>>) => {
        state.catalog.status = "success"
        state.catalog.isFinish = false
        state.catalog.isFinish = action.payload.length !== 6
        state.catalog.value = action.payload
      })

      .addCase(getCatalogMoreAsync.pending, (state) => {
        state.catalog.status = "loading"
      })
      .addCase(getCatalogMoreAsync.rejected, (state) => {
        state.catalog.status = "error"
      })
      .addCase(getCatalogMoreAsync.fulfilled, (state, action: PayloadAction<Array<ICard>>) => {
        state.catalog.status = "success"
        state.catalog.isFinish = action.payload.length !== 6
        state.catalog.value.push(...action.payload)
      })

      .addCase(getProductInfoById.pending, (state) => {
        state.productInfo.status = "loading"
        state.productInfo.value = null
      })
      .addCase(getProductInfoById.rejected, (state) => {
        state.productInfo.status = "error"
        state.productInfo.value = null
      })
      .addCase(getProductInfoById.fulfilled, (state, action: PayloadAction<IProductInfoForCart>) => {
        console.log("🚀 ~ file: mainSlice.ts ~ line 213 ~ .addCase ~ action", action)
        state.productInfo.status = "success"
        state.productInfo.value = { ...action.payload }
      })

      .addCase(setOrder.pending, (state) => {
        state.order.status = "loading"
      })
      .addCase(setOrder.rejected, (state) => {
        state.order.status = "error"
      })
      .addCase(setOrder.fulfilled, (state, action) => {
        state.order.status = "success"
        console.log("🚀 ~ file: mainSlice.ts ~ line 227 ~ .addCase ~ state", state)
        console.log("🚀 ~ file: mainSlice.ts ~ line 227 ~ .addCase ~ action", action)
        localStorage.removeItem("order")
      })
  },
})

export const { changeSeachText, changeCountOrders, setOrderStatus } = mainSlice.actions

export default mainSlice.reducer
