import { FC } from "react";
import './search.component.sass';

interface SearchModel {
    enterButton: string,
    onSearch: (query: string ) => void,
    className?: string,
    placeholder?: string,
    query?: string,
}

const Search : FC<SearchModel> = ({query, onSearch, enterButton, placeholder, className}) => {

    function fireSearch() {
        const searchQuery = (document.getElementById('bg-util-searchbar') as HTMLInputElement).value;
        console.log(searchQuery);
        onSearch(searchQuery);
    }

    return (
        <div className={`bg-util-search ${className ? className : ''}`}>
            <input
                className='bg-util-searchInput'
                value={query}
                type="text"
                id="bg-util-searchbar"
                placeholder={placeholder}
                name="id"
                autoComplete="off"
            />
            <button className="bg-util-searchBtn" onClick={fireSearch}>{enterButton}</button>
        </div>
    )
}

export default Search;