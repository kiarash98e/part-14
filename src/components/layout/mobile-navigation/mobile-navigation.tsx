import React from 'react'
import { IoAddCircleOutline, IoFilterOutline, IoSearchOutline } from 'react-icons/io5'
import { useUi } from '../../../redux/selectors/ui/uiState'


const BottomNavigation: React.FC = () => {
	
	const { uiOpenSearch,uiModalViwe,uiOpenModal,uiOpenSidebar } = useUi()

	const addModal = () => {
        uiModalViwe("Add")
        uiOpenModal()
    }
	
	return (
		<>
			<div className="md:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-10 sm:h-12 rounded-t-full px-4">
				<div className='w-[80%] mx-auto flex items-center justify-between px-3'>
				<button
					aria-label="filter"
					className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
					onClick={uiOpenSidebar}
				>
					<IoFilterOutline size={25}/>
				</button>
				<button
					className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
					
					aria-label="search-button"
					onClick={uiOpenSearch}
				>
					<IoSearchOutline size={25}/>
				</button>
				<button
					className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
					
					aria-label="add task"
					onClick={addModal}
				>
					<IoAddCircleOutline size={25}/>
				</button>
				</div>
				
			</div>
			
		</>
	);
};

export default BottomNavigation;
