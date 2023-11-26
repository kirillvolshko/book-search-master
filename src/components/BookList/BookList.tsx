import React, {useState, useEffect} from 'react'
import BookCard from '../BookCard/BookCard';
import './BookList.css'
import { Link } from 'react-router-dom'

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
interface DataProps {
    data: Book;
}

const BookList: React.FC<DataProps> = ({data})  =>{
  const [bookData, setBookData] = useState<Book>(data);

  useEffect(() => {
    setBookData(data);
  }, [data]);
  return (
    <div>
        <div>
            <p>Found {bookData.totalItems} results</p>
        </div>
        <div className='container'>
        <div className='books-list'>
            {bookData.items.map(BookItem => (
              <Link to={`/book/${BookItem.id}`} key={BookItem.id} state={{ item: BookItem }}>
                <BookCard  key={BookItem.id} data={BookItem} />
              </Link>
            ))}
        </div>
        </div>
    </div>
  )
}

export default BookList