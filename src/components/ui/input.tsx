import React from 'react'

interface IInput {
    value:string,
    type: "text" | "email",
    name:string,
    onChange:(e:React.ChangeEvent) => void
    label:string,
    defaultValue?: string | undefined,
    errorText?: string,
    placeHolder:string | undefined
}

const Input:React.FC<IInput> = ({
    type,
    value,
    onChange,
    name,
    label,
    defaultValue,
    placeHolder
}) => {
    
    
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                value={value}
                onChange={onChange}
                name={name}
                defaultValue={defaultValue ? defaultValue : undefined}
                placeholder={placeHolder}
                className={`block w-full text-heading border-purple-400 bg-transparent outline-none border-b-2 py-2 px-2  placeholder-purple-500 focus:bg-purple-100 `}
              
          
            /> 
        </>
    )
}

export default Input
