import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { closeModal, closeSearch, closeSidebar, openModal, openSearch, openSidebar, setModalData, setModalViwe, MODAL_VIEWS } from '../../reducers/uiRedux/uiRedux'

export const useUi = () => {
    const dispatch = useAppDispatch()
    const uiState = useAppSelector((state) => state.ui)

    const uiOpenModal = () => dispatch(openModal())
    const uiOpenSearch = () => dispatch(openSearch())
    const uiOpenSidebar = () => dispatch(openSidebar())
    const uiCloseModal = () => dispatch(closeModal())
    const uiCloseSearch = () => dispatch(closeSearch())
    const uiCloseSidebar = () => dispatch(closeSidebar())
    const uiModalViwe = (viwe:MODAL_VIEWS) => dispatch(setModalViwe(viwe))
    const uiModalData = (data:any) => dispatch(setModalData(data))

    return { uiState, uiCloseModal, uiCloseSearch, uiCloseSidebar, uiOpenModal, uiOpenSearch, uiOpenSidebar,uiModalViwe, uiModalData }
} 