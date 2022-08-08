/* eslint-disable no-sparse-arrays */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Drawer } from "./drawer";
import { IoCloseOutline } from 'react-icons/io5';
import { useUi } from '../../redux/selectors/ui/uiState';
import Divider from '../ui/divider';
import { useTodo } from '../../redux/selectors/todo/todoState';
import { filterPriorityAction, filterStatusAction } from '../../redux/reducers/todoRedux/todoRedux';

const ManagedDrawer: React.FC = () => {


    const { uiState, uiCloseSidebar } = useUi()
    const { dispatch } = useTodo()


    const [filter, setFilter] = useState({
        status:"",
        priority:""
    })
    
    const handelReset = () => {
        setFilter({
            status:"",
            priority:"",
        })

        setTimeout(() => {
            uiCloseSidebar()
        },500)
    }

    const handleChange = (e:React.FormEvent) => {
        const { name, value } = e.target as HTMLInputElement
        setFilter({
            ...filter,
            [name]:value
        })
    }

    useEffect(() => {
        dispatch(filterPriorityAction(filter.priority))     
    }, [dispatch, filter.priority])

    useEffect(() => {
        dispatch(filterStatusAction(filter.status))
    }, [dispatch, filter.status])


    
   
    return (
        <Drawer
            level={null}
            open={uiState.displaySideBar}
            placement={"right"}
            onClose={uiCloseSidebar}
            handler={false}
            showMask={true}
            width={340}
            duration="0.5s"
            contentWrapperStyle={{
                right: '0',
                background: "#f8f8f8",
                zIndex: "1000",
            }}

        >
            <div className="w-full h-full flex px-2 md:px-2">
                <div className="flex w-full h-full flex-col bg-white py-6 px-2">
                    <div className="w-full flex items-center justify-between">
                        <h4 className='text-base md:text-lg xl:text-xl text-heading'>Filters</h4>
                        <button
                            onClick={uiCloseSidebar}
                            type="button"
                            className="outline-none text-2xl md:text-3xl w-12 md:w-14 h-full flex items-center justify-center hover:text-heading focus:outline-none"

                        >
                            <IoCloseOutline size={26} className="text-heading " />
                        </button>
                    </div>
                    <div className="w-full pt-3">
                        <Divider />
                    </div>
                    <div className="my-4 flex flex-col py-3">
                        <select
                            className="cursor-pointer border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
                            onChange={handleChange} name="priority" value={filter!.priority}>
                            <option value="All">All</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>

                        <select
                            className="cursor-pointer border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
                            onChange={handleChange} name="status" value={filter!.status}>
                            <option value="All">All</option>
                            <option value="Todo">Todo</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="my-3 text-center">
                        <button onClick={handelReset}
                           className="w-2/6 border border-indigo-400 hover:bg-indigo-500 hover:text-white rounded-md py-2 px-2 text-md font-semibold mt-10">                           
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default ManagedDrawer;
