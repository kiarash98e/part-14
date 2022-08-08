
import { MdArrowDownward,MdArrowUpward } from 'react-icons/md'

export function priorityColor(priority:any) {
    if (priority === "Low") {
        return "#9E9E9E"
    } else if (priority === "Medium") {
        return "#FFC600"
    } else if (priority === "High") {
        return "#F44336"
    } 
    else {
        return ""
    }
}

export function statusColor(status:any) {
    if (status === "Todo") {
        return "#2196F3"
    } else if (status === "Doing") {
        return "#FF9800"
    } else if (status === "Done") {
        return "#4CAF50"
    } else {
        return ""
    }
}

export const orderBy = (orderTodo: any, value: any, direction: any) => {
    const priorities = ['Low', 'Medium', 'High']
    const statuses = ["Todo", "Doing", "Done"]


    switch (direction) {
        case "asc":
            return [...orderTodo].sort((a, b) => {
                return value === "priority" ? priorities.indexOf(a.priority) - priorities.indexOf(b.priority) : statuses.indexOf(a.status) - statuses.indexOf(b.status)
            })
        case "desc":
            return [...orderTodo].sort((a, b) => {
                return value === "priority" ? priorities.indexOf(b.priority) - priorities.indexOf(a.priority) : statuses.indexOf(b.status) - statuses.indexOf(a.status)
            })
        default:
            return orderTodo
    }
}

export const SortArrow = ({ direction }:any) => {
    if (!direction){ return <span className="invisible"><MdArrowDownward /></span> }

    if (direction === "asc") {
        return <MdArrowUpward />

    } else {
        return <MdArrowDownward />

    }
}