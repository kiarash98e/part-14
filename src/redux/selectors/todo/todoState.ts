import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { 
    addTodo, 
    deleteTodo, 
    editTodo, 
    todosCount, 
    ITask,
    searchTodo,
} from '../../reducers/todoRedux/todoRedux'

export const useTodo = () => {
    const dispatch = useAppDispatch()
    const todoState = useAppSelector((state) => state.todo)

    const todosCounts = () => dispatch(todosCount())
    const deleteTodos = (id:number) => dispatch(deleteTodo(id))
    const addTodos = (item:ITask) => dispatch(addTodo(item))
    const editTodos = (item:ITask) => dispatch(editTodo(item))
    const searchTodos = (item:string) => dispatch(searchTodo(item))
    
    return { 
        todosCounts, 
        deleteTodos, 
        editTodos, 
        addTodos, 
        searchTodos,
        dispatch,
        todoState 
    }
   
} 