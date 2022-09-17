import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { currentPage, category, sortType, search } = params
        const { data } = await axios.get(
            `https://62d45328cd960e45d456a05c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortOption}&order=${sortType.sortOrder}${search}`
        )
        return data
    }
)

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.status = 'success'
            state.items = action.payload
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        },
    },
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
