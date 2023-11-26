import React from 'react'
import {useState, KeyboardEvent} from 'react'
import './SearchBar.css'
interface SearchProps {
    setBook: (value: string) => void;
    onSearch: () => void;
}



    const SearchBar: React.FC<SearchProps>= ({setBook, onSearch})  =>{
    const [searchBook, setSearchBook] = useState<string>('');
    const handleSearch = () => {
        sessionStorage.removeItem('bookData');
        setBook(searchBook);
        onSearch();
        setSearchBook('');
      };
  return (
    <div>
        <input
        className='search-input'
        type='text'
        placeholder='Name of book'
        value={searchBook}
        onChange={(e) => setSearchBook(e.target.value)}
        onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && handleSearch()}
        />
        <button className='search-button' onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar