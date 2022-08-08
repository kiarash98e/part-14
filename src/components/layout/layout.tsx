/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Header from '../layout/header/header'
import Main from '../layout/main/main'


const layout:React.FC = () => {

    return (
        <div className='flex flex-col min-h-screen bg-gray-600'>
            <Header />
            <Main />
        </div>
    )
}

export default layout