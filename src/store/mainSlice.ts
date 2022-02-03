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
export interface ICategory {
  id: number
  title: string
}

interface IMainState {
  topSales: {
    value: ICard[]
    status: "idle" | "loading" | "success" | "error"
  }
  category: {
    value: ICategory[]
    status: "idle" | "loading" | "success" | "error"
  }
  catalog: {
    value: ICard[]
    status: "idle" | "loading" | "success" | "error"
  }
}

const initialState: IMainState = {
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
  },
}

export const getCategoryAsync = createAsyncThunk("main/getCategoryAsync", async () => {
  const response = await axios("http://localhost:7070/api/categories")

  // The value we return becomes the `fulfilled` action payload
  return response.data
})

export const getTopSalesAsync = createAsyncThunk("main/getTopSalesAsync", async () => {
  const response = await axios("http://localhost:7070/api/top-sales")
  // The value we return becomes the `fulfilled` action payload
  return response.data
})

export const getCatalogAsync = createAsyncThunk("main/getCatalogAsync", async () => {
  const response = await axios("http://localhost:7070/api/items")
  // The value we return becomes the `fulfilled` action payload
  return response.data
})

export const getCatalogMoreAsync = createAsyncThunk("main/getCatalogMoreAsync", async (offset: number) => {
  const response = await axios(`http://localhost:7070/api/items?offset=${offset}`)
  // The value we return becomes the `fulfilled` action payload
  return response.data
})

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    // getCategory: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryAsync.pending, (state) => {
        state.category.status = "loading"
      })
      .addCase(getCategoryAsync.fulfilled, (state, action) => {
        console.log("🚀 ~ file: mainSlice.ts ~ line 171 ~ .addCase ~ action", action)
        state.category.status = "success"
        state.category.value = action.payload
      })

      .addCase(getTopSalesAsync.pending, (state) => {
        state.topSales.status = "loading"
      })
      .addCase(getTopSalesAsync.fulfilled, (state, action) => {
        console.log("🚀 ~ file: mainSlice.ts ~ line 171 ~ .addCase ~ action", action)
        state.topSales.status = "success"
        state.topSales.value = action.payload
      })

      .addCase(getCatalogAsync.pending, (state) => {
        state.catalog.status = "loading"
      })
      .addCase(getCatalogAsync.fulfilled, (state, action) => {
        console.log("🚀 ~ file: mainSlice.ts ~ line 171 ~ .addCase ~ action", action)
        state.catalog.status = "success"
        state.catalog.value = action.payload
      })

      .addCase(getCatalogMoreAsync.pending, (state) => {
        state.catalog.status = "loading"
      })
      .addCase(getCatalogMoreAsync.fulfilled, (state, action) => {
        console.log("🚀 ~ file: mainSlice.ts ~ line 171 ~ .addCase ~ action", action)
        state.catalog.status = "success"
        state.catalog.value.push(...action.payload)
      })
  },
})

// export const { incrementByAmount } = mainSlice.actions

export default mainSlice.reducer
