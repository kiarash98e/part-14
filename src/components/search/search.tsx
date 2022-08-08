/* eslint-disable @typescript-eslint/no-unused-vars */
import React,{useState,FC,useRef,useEffect} from 'react'
import cn from "classnames"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks,
} from "body-scroll-lock"
import SearchBox from './search-box'
import { useUi } from '../../redux/selectors/ui/uiState'
import { useTodo } from '../../redux/selectors/todo/todoState'



const Search:FC = () => {
  
    const { uiState, uiCloseSearch } = useUi()
    const { searchTodos } = useTodo()

    const [inputSearch, setInputSearch] = useState<string>("")
   
    const handleChange = (e:React.ChangeEvent) => {
        const {value} = e.target as HTMLInputElement
        setInputSearch(value)
    }

    const handleSubmit = (e:React.SyntheticEvent) => {
        
        e.preventDefault()
        searchTodos(inputSearch)
        setTimeout(() => {
            uiCloseSearch()
        }, 500);
    }

    const clearSearch = () => {
        setInputSearch('')
    }

    const searchBoxRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      
        if (searchBoxRef!.current) {
            if (uiState.displaySearch) {
                enableBodyScroll(searchBoxRef!.current)
            }
            else{
                disableBodyScroll(searchBoxRef!.current)
            }
        }

        
        return () => {
            clearAllBodyScrollLocks()
        }
    }, [uiState.displaySearch])

    return (
        <div ref={searchBoxRef}>
            <div 
                className={cn("overlay", {
					open: uiState.displaySearch,
				})}
				role="button"
				onClick={() => uiCloseSearch()}
								
			
            />
            <div className={cn(
					"drawer-search relative bg-white h-24 hidden top-0 z-[1150] opacity-0 invisible transition duration-300 ease-in-out left-1/2 w-full lg:w-[730px] xl:w-full",
					{
						open: uiState.displaySearch,
					}
				)}>
                    <div className="w-full flex flex-col justify-center">
                        <div className="flex-shrink-0 mt-3.5 lg:mt-4 w-full">
                            <div className="flex flex-col mx-auto mb-1.5 w-full bg-white">
                                <SearchBox
                                    value={inputSearch}
                                    name="search"
                                    onChange={handleChange}
                                    onSubmit={handleSubmit}
                                    onClear={clearSearch}
                                    onClick={() => uiCloseSearch()}
                                    ref={(input) => input && input.focus()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Search