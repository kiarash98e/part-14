import React from 'react'
import Title from '../ui/title'
import Input from '../ui/input'
import { DatePicker } from "jalali-react-datepicker";
import { useTodo } from '../../redux/selectors/todo/todoState';
import { ITask } from '../../redux/reducers/todoRedux/todoRedux';
import { useUi } from '../../redux/selectors/ui/uiState';
import moment from 'jalali-moment';


const EditTask: React.FC = () => {

    const { editTodos } = useTodo()
    const { uiCloseModal, uiState  } = useUi()

    const data  = uiState.modalData
    const [todoState, setTodoState] = React.useState<ITask>(data)


    const handleSubmit =
        (e: React.FormEvent) => {
            const { value, name } = e.target as HTMLInputElement
 
            setTodoState({
                ...todoState,
                [name]: value,

            })


        }
        const convertedDeadline = moment(todoState!.deadline)
            .locale("en")
                      

    const editTodoSubmit = () => {
        editTodos(todoState)
        uiCloseModal()
        console.log(todoState)
    }

    const handleDateChange = (e: any) => {
        setTodoState({
            ...todoState,
            ["deadline"!]: e.value._d
        })
    }


    return (
        <form
            noValidate
        >
            <div className="mb-3 py-4">
                <Title title='New Task' />
            </div>
            <div className="mb-3">
                <Input
                    label='Task'
                    name='task'
                    value={todoState!.task}
                    placeHolder='add task ...'
                    type='text'
                    onChange={handleSubmit}
                />
            </div>
            <div className="mb-3 bg-white flex flex-col ">
                <select
                    className="cursor-pointer bold  border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
                    onChange={handleSubmit} name="priority" value={todoState.priority}>
                    <option value="priority">Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <select
                    className="cursor-pointer block my-2 border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
                    onChange={handleSubmit} name="status" value={todoState.status}>
                    <option value="status">Status</option>
                    <option value="Todo">Todo</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <div className='my-3'>
                <DatePicker
                    className="w-full cursor-pointer h-12"
                    timePicker={false}
                    value={convertedDeadline}
                    onClickSubmitButton={handleDateChange}
                />
            </div>
            <div className='flex justify-between items-center px-3'>
                <button type='button' onClick={editTodoSubmit} className='block rounded-md bg-purple-600 text-purple-200 font-bold w-full h-20 text-center my-5 ease-in-out duration-300 hover:bg-white hover:text-purple-600'>save</button>
                <button type='button' onClick={uiCloseModal} className='block rounded-md text-input font-bold w-full h-20 text-center my-5 ease-in-out duration-300 hover:bg-text-subTitle hover:text-teal-500'>cancel</button>

            </div>
        </form>
    )
}

export default EditTask