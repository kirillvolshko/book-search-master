import React, {useState, useEffect} from 'react'
import './BookCard.css'
interface BookInfo {
    authors: string[];
    categories: string;
    description: string;
    imageLinks: {
        smallThumbnail: string,
        thumbnail: string
    },
    title: string;
  }
  
  interface BookProps {
    data: {
      id: string;
      volumeInfo: BookInfo;
    };
  }

const BookCard: React.FC<BookProps> = ({data})  =>{
  
  return (
    <div className='book-card'>
        <div>
          <img className='img-book' src={data.volumeInfo?.imageLinks?.thumbnail} alt='book-img' />
        </div>
        <div className='text-card'>
            <p className='category-card'>{data.volumeInfo?.categories?.length > 0 ? data.volumeInfo.categories[0].split('&')[0] : "no categories"}</p>
            <p className='title-card'>{data.volumeInfo?.title ? data.volumeInfo.title : "no title"}</p>
            <p className='authors-card'>{data.volumeInfo?.authors?.length > 0 && data.volumeInfo.authors.join(", ")}</p>
        </div>
    </div>
  )
}

export default BookCard