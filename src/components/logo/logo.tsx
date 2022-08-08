import React from 'react'
import { IoApps } from 'react-icons/io5'

interface ILogo{
    title:string
}

const logo: React.FC <ILogo> = ({title}) => {
    return (
        <>
            <IoApps className='text-title' size={30}/>
            <h3 className='text-title text-base md:text-xl my-auto lg:text-2xl ps-2 font-satisfy items-center'>{title}</h3>  
        </>
    )
}

export default logo
