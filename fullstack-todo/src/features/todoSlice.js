import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"



const initialState = {
    todos: []
}


export const fetchTodos = createAsyncThunk('todos/fetch', async (data, thunkApi) => {
    try {
        const res = await fetch('http://localhost:3000/todo')
        const todos = await res.json()
        return thunkApi.fulfillWithValue(todos)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const deleteTodo = createAsyncThunk('todos/delete', async (data, thunkApi) => {
    try {
        const res = await fetch(`http://localhost:3000/todo/${data}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const todo = await res.json()
        return thunkApi.fulfillWithValue(todo)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const addTodo = createAsyncThunk('todos/add', async (data, thunkApi) => {
    try {
        const res = await fetch('http://localhost:3000/todo', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: data,
                completed: false
            })
        })
        const todo = await res.json()
        return thunkApi.fulfillWithValue(todo)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})



export const completedTodo = createAsyncThunk('todos/completed', async ({ id, completed }, thunkApi) => {
    try {
        const res = await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                completed: !completed
            })

        })
        const todo = await res.json()
        return todo
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter((item) => item._id !== action.payload._id)
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload)
            })
            .addCase(completedTodo.fulfilled, (state, action) => {
                state.todos = state.todos.map((item) => {
                    if (item._id === action.payload._id) {
                        return action.payload
                    }
                    return item
                })
            })

    }
})

export default todoSlice.reducer

