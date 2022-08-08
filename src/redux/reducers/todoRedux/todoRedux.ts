import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type status = "Done" | "Todo" | "Doing"
export type priority = "Low" | "Medium" | "High"


export interface ITask {
    id?: number
    task: string
    status: status | string
    priority: priority | string 
    deadline: Date 
    actions?: any | null
}

interface State {
    todos: ITask[],
    count: number,
    search:any,
    lastPage:boolean
}

const initialState:State = {
    todos: localStorage.getItem("todos") ? JSON.parse(localStorage!.getItem("todos")!) : [],
    count: 0,
    search: [],
    lastPage:false

}

const todoSlice = createSlice({
    name:"todoRedux",
    initialState:initialState,
    reducers:{
        addTodo: (state,action:PayloadAction<ITask>) => {
            state.todos.push(action.payload)
            state.search = [...state.todos]   
        },
        deleteTodo: (state,action:PayloadAction<number>) => {
            state.todos = state.todos.filter((item:any) => item.id !== action.payload)
            state.search = [...state.todos]
            localStorage.setItem("todos",JSON.stringify(state.todos))
        },
        todosCount: (state) => {
            state.count = state.search.length
        },
        editTodo: (state, action:PayloadAction<ITask>) => {
            state.todos = state.todos.map((item:ITask) => 
                item.id === action.payload.id ? { ...item , ...action.payload} : item
            )  
            state.search = [...state.todos]
        },
        searchTodo: (state, action:PayloadAction<string>) => {
            const filterSearch = (term:any) => [term.task].join('').toLowerCase().includes(action.payload.toLowerCase())
            state.search = state.todos.filter((item:any) => {
                if (!action.payload) return state.todos
                return filterSearch(item)
            })
        },
        filterPriorityAction: (state, action:PayloadAction<any>) => {
            state.search = state.todos.filter((item:any) => {
                if (action.payload === "All") return state.todos
                return item.priority.toLowerCase().includes(action.payload.toLowerCase())
            })
        },
        filterStatusAction: (state, action:PayloadAction<any>) => {
            state.search = state.todos.filter((item:any) => {
                if (action.payload === "All") return state.todos
                return item.status.toLowerCase().includes(action.payload.toLowerCase())
            })
        },
    }
})

export const { 
    addTodo, 
    deleteTodo, 
    todosCount, 
    editTodo, 
    searchTodo, 
    filterPriorityAction, 
    filterStatusAction, 
    } = todoSlice.actions
export default todoSlice.reducer