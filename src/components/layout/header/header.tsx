/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { IoAddCircleSharp, IoFilterOutline, IoSearchOutline } from 'react-icons/io5'
import { useUi } from '../../../redux/selectors/ui/uiState'
import Logo from '../../logo/logo'


const header:React.FC<any> = () => {

    const { uiOpenSearch, uiOpenSidebar, uiOpenModal, uiModalViwe } = useUi()

    const addModal = () => {
        uiModalViwe("Add")
        uiOpenModal()
    }
    
    return (
        <>
            <header className=' h-16 sm:h-20 lg:h-24 w-full relative z-[1000]'>
                <div className="innerSticky lg:w-full text-white body-font fixed bg-green w-full h-16 sm:h-20 lg:h-24 z-20 ps-2 md:ps-0 lg:ps-16 pe-2 lg:pe-6">
                    <div className="flex items-center justify-between mx-auto px-4 max-w-[1920px] h-full w-full py-4">
                        <div className='flex'>
                            <Logo title={"My ToDo List By Redux RTK"} />
                        </div>
                        <div className="hidden md:flex px-3">
                            <button
                                className="flex mb-[5px] px-2 text-title items-center justify-center flex-shrink-0 p-0 h-auto relative focus:outline-none transform"
                                aria-label="search button"
                                onClick={uiOpenSearch}
                                >
                                <IoSearchOutline size={30} />
                            </button>
                            <button
                                className="flex mb-[5px] px-2 text-title items-center justify-center flex-shrink-0 p-0 h-auto relative focus:outline-none transform"
                                aria-label="search button"
                                onClick={uiOpenSidebar}
                                >
                                <IoFilterOutline size={30} />
                            </button>
                            <button
                                className="flex mb-[5px] px-2 text-title items-center justify-center flex-shrink-0 p-0 h-auto relative focus:outline-none transform"
                                aria-label="add tasks"
                                onClick={addModal}
                                >
                                <IoAddCircleSharp size={30} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default header
 