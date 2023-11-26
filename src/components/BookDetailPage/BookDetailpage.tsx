import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './BookDetailpage.css'

interface BookInfo {
  authors: string[];
  categories: string;
  description: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  title: string;
}

interface BookProps {
  data: {
    id: string;
    volumeInfo: BookInfo;
  };
}

const BookDetailpage: React.FC = () => {

  const location = useLocation();
  const item = (location.state as any)?.item;

  return (
    <div className='container-book'>
      <div className='container-image'>
        <img className='book' src={item.volumeInfo?.imageLinks?.thumbnail} alt='book-img' />
      </div>
      <div className='container-text'>
        <p className='category-card'>{item.volumeInfo.categories}</p><br/>
        <p className='title-card'>{item.volumeInfo.title}</p><br/>
        <p className='authors-card'>{item.volumeInfo.authors}</p><br/>
        <p className='description-book'>{item.volumeInfo.description}</p><br/>
      </div>
    </div>
  );
}

export default BookDetailpage;
