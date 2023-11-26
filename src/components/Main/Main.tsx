import React, {useState, useEffect} from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Filters from '../Filters/Filters';
import BookList from '../BookList/BookList';
import './Main.css'
interface Book {
    kind: string;
    totalItems: number;
    items: BookItem[];
  }
  interface BookItem {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
        authors: string[],
        categories: string,
        description: string,
        imageLinks: {
            smallThumbnail: string,
            thumbnail: string
        },
        title:string


    };
  }

const Main: React.FC = ()  =>{
    const [book, setBook] = useState<string>('');
    const [data, setData] = useState<Book>({kind: '', totalItems: 0, items: []});
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<string>('relevance');
    const [loading, setLoading] = useState<boolean>(false);
    const [startIndex, setStartIndex] = useState<number>(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
              setLoading(true);
      
              const APIKey = `AIzaSyBBA37PHb5UjrZfGBvNsHUF8xct7TRybJ8`
              const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}+subject:${category}&orderBy=${sort}&startIndex=${startIndex}&maxResults=30&key=${APIKey}`);
              const newData = await response.json();
      
              setData((prevData) => ({
                ...newData,
                items: [...(prevData?.items || []), ...newData.items],
              }));
              const storedData = sessionStorage.getItem('bookData');
              if (storedData) {
                const storedDataObject = JSON.parse(storedData);
                sessionStorage.setItem(
                'bookData',
                JSON.stringify({
                ...storedDataObject,
                items: [...storedDataObject.items, ...newData.items],
                })
            );
        } else {
          sessionStorage.setItem('bookData', JSON.stringify(newData));
        }
            } catch (error) {
              console.error('Error fetching data:', error);
            } finally {
              
              setLoading(false);
            }
          };
      
          const storedData = sessionStorage.getItem('bookData');
          if (startIndex >= 0) {
            if (book.trim() !== '') {
              fetchData();
            }
          } else if (storedData && (!data || data?.items.length === 0)) {
            setData(JSON.parse(storedData));
          }
    }, [book, startIndex]); 
    useEffect(() => {
        const storedData = sessionStorage.getItem('bookData');
        if (storedData && (!data || data?.items.length === 0)) {
          setData(JSON.parse(storedData));
        }
      }, []);
    const handleLoadMore = () => {
        const prevIndex = startIndex + 30;
        setStartIndex(prevIndex);
        
      };
    const handleSearch = () => {
        sessionStorage.removeItem('bookData');
        setStartIndex(0);
        setData({ kind: '', totalItems: 0, items: [] });
      };
     
    console.log(data)
  return (
    <div>
        <div className='search-container'>
            <SearchBar setBook={setBook} onSearch={handleSearch}/>
            <Filters setCategoryProps={setCategory} setSortProps={setSort}/>
        </div>
        {loading ? ( 
        <p>Loading...</p>
      ) : (
        data ? (
            <>
                <BookList data={data} />
                <button onClick={handleLoadMore} className='button-more'>Load more</button>
            </>
        ) : (
          <p>No data available</p>
        )
      )}
    </div>
  )
}

export default Main