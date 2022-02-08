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

interface IMainState {
  searchText: string
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
}

const initialState: IMainState = {
  searchText: "",
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

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeSeachText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryAsync.pending, (state) => {
        state.category.status = "loading"
        state.category.value = []
      })
      .addCase(getCategoryAsync.fulfilled, (state, action) => {
        console.log("🚀 ~ file: mainSlice.ts ~ line 171 ~ .addCase ~ action", action)
        state.category.status = "success"
        state.category.value.push({ id: 0, title: "Все" })
        state.category.value.push(...action.payload)
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
        state.catalog.value = []
        state.catalog.status = "loading"
      })
      .addCase(getCatalogAsync.fulfilled, (state, action) => {
        console.log("🚀 ~ file: mainSlice.ts ~ line 171 ~ .addCase ~ action", action)
        state.catalog.isFinish = false
        state.catalog.status = "success"
        state.catalog.value = action.payload
      })

      .addCase(getCatalogMoreAsync.pending, (state) => {
        state.catalog.status = "loading"
      })
      .addCase(getCatalogMoreAsync.fulfilled, (state, action) => {
        console.log("🚀 ~ file: mainSlice.ts ~ line 171 ~ .addCase ~ action", action)
        state.catalog.status = "success"
        state.catalog.isFinish = action.payload.length !== 6
        console.log("🚀 ~ file: mainSlice.ts ~ line 120 ~ .addCase ~ action.payload.length", action.payload.length !== 6)
        state.catalog.value.push(...action.payload)
      })
  },
})

export const { changeSeachText } = mainSlice.actions

export default mainSlice.reducer
