import React from 'react'
import Title from '../ui/title'
import Input from '../ui/input'
import { DatePicker } from "jalali-react-datepicker";
import { useTodo } from '../../redux/selectors/todo/todoState';
import { ITask } from '../../redux/reducers/todoRedux/todoRedux';
import { useUi } from '../../redux/selectors/ui/uiState';


const AddTask: React.FC = () => {

    const { addTodos,todoState,todosCounts } = useTodo()
    const { uiCloseModal } = useUi()
    const [todoStat, setTodoStat] = React.useState<ITask>({
        task: "",
        status: "",
        priority: "",
        deadline: new Date(),
    })

    const handleSubmit =
        (e: React.FormEvent) => {
            const { value, name } = e.target as HTMLInputElement

            setTodoStat({
                ...todoStat,
                [name]: value,

            })


        }

    const addTodoSubmit = () => {
        const id = todoState.todos.length + 1
        const finalState = {...todoStat, id}
        addTodos(finalState)
        todosCounts()
        setTodoStat({
            task: "",
            status: "status",
            priority: "priority",
            deadline: new Date(),
        })
        uiCloseModal()
    }

    const handleDateChange = (e: any) => {
        setTodoStat({
            ...todoStat,
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
                    value={todoStat!.task}
                    placeHolder='add task ...'
                    type='text'
                    onChange={handleSubmit}
                />
            </div>
            <div className="mb-3 bg-white flex flex-col ">
                <select
                    className="cursor-pointer bold  border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
                    onChange={handleSubmit} name="priority" value={todoStat.priority}>
                    <option value="">Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <select
                    className="cursor-pointer block my-2 border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
                    onChange={handleSubmit} name="status" value={todoStat.status}>
                    <option value="">Status</option>
                    <option value="Todo">Todo</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <div className='my-3'>
                <DatePicker
                    className="w-full cursor-pointer h-12"
                    timePicker={false}
                    value={todoStat!.deadline}
                    onClickSubmitButton={handleDateChange}
                />
            </div>
            <div className='flex justify-between items-center px-3'>
                <button type='button' onClick={addTodoSubmit} className='block rounded-md bg-purple-600 text-purple-200 font-bold w-full h-20 text-center my-5 ease-in-out duration-300 hover:bg-white hover:text-purple-600'>save</button>
                <button type='button' onClick={uiCloseModal} className='block rounded-md text-input font-bold w-full h-20 text-center my-5 ease-in-out duration-300 hover:bg-text-subTitle hover:text-teal-500'>cancel</button>

            </div>
        </form>
    )
}

export default AddTask