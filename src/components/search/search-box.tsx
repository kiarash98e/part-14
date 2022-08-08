import React from 'react'
import {  IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

type SearchProps = {
	className?: string;
	onSubmit: (e: React.SyntheticEvent) => void;
	onClear: (e: React.SyntheticEvent) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
	value: string;
	onClick:Function
};

const SearchBox = React.forwardRef<HTMLInputElement, SearchProps>(
	({ className, onSubmit, onClear, onClick, onChange, name, value }, ref) => {
		
        function closeAndClear (e:any) {
            onClear(e)
            onClick()
        }
        return (
            <form 
            noValidate
            role={"search"}
            className={"relative px-4 md:px-10 bg-white overflow-hidden rounded-md w-full"}
            onSubmit={onSubmit}>
            <label htmlFor={name} className="flex items-center py-0.5 bg-gray-350 rounded-3xl ps-2 w-full lg:w-4/5 px-4">
                <span className="w-12 md:w-14 h-full flex flex-shrink-0 justify-center items-center cursor-pointer focus:outline-none">
                    <IoSearchOutline size={30}/>
                </span>
                <input type="search"
                    id={name}
                    ref={ref}
                    onChange={onChange}
                    value={value}
                    name={name}
                    placeholder="search Task ..."
                    aria-label="Search"
					autoComplete="off"
                    className={className + " text-heading outline-none w-full h-12 lg:h-14 placeholder-heading bg-gray-350 text-sm lg:text-base"}
                />
            </label>
            <button 
                onClick={closeAndClear}
                type="button"
                className="outline-none text-2xl md:text-3xl text-gray-400 absolute top-0 right-5 md:right-12  xl:right-10 w-12 md:w-14 h-full flex items-center justify-center hover:text-heading focus:outline-none"
				
            >
                <IoCloseOutline size={50} className="text-heading"/>
            </button>
        </form>
		);
	}
);



export default SearchBox
