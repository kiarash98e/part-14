import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface State{
    displaySearch:boolean
    displaySideBar:boolean
    displayModal:boolean
    modalView: MODAL_VIEWS
    modalData: any
}

export type MODAL_VIEWS = 
| "Add"
| "Edit"
| "Delete"

const initialState:State = {
    displaySideBar : false,
    displayModal : false,
    displaySearch : false,
    modalView: 'Add',
    modalData: null,
}

const uiSlice = createSlice({
    name:"uiRedux",
    initialState:initialState,
    reducers:{
        openModal:(state) => {
            state.displayModal = true
            state.displaySideBar = false
        },
        closeModal:(state) => {
            state.displayModal = false
        },
        openSearch:(state) => {
            state.displaySearch = true
        },
        closeSearch:(state) => {
            state.displaySearch = false
        },
        openSidebar:(state) => {
            state.displaySideBar = true
        },
        closeSidebar:(state) => {
            state.displaySideBar = false
        },
        setModalViwe:(state,action:PayloadAction<MODAL_VIEWS>) => {
            state.modalView = action.payload
        },
        setModalData:(state,action:PayloadAction<any>) => {
            state.modalData = action.payload
        },
    }
})

export const { openModal, openSearch, openSidebar, closeModal, closeSearch, closeSidebar, setModalData, setModalViwe } = uiSlice!.actions
export default uiSlice.reducer