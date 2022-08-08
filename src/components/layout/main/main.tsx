/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useTodo } from '../../../redux/selectors/todo/todoState'
import Table from '../../table/table'


const main:React.FC = () => {
    
    const { todoState } = useTodo()
    return (
        <main 
            className="relative flex-grow mb-3"
            style={{
            minHeight: "-webkit-fill-available",
            WebkitOverflowScrolling: "touch",
        }}
        >
           <Table data={todoState.search} /> 
        </main>
    )
}

export default main
