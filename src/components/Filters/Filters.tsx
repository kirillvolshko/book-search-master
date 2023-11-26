import React, {useState, useEffect} from 'react'
import './Filters.css'
interface FiltersProps {
    setCategoryProps: (value: string) => void;
    setSortProps: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({setCategoryProps, setSortProps})  =>{
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<string>('relevance');
    const handleFilter = () => {
        if(category === 'all'){
            setCategoryProps('')
        }else{
            setCategoryProps(category);
        }
        setSortProps(sort);
      };
  return (
    <div className='filters-container'>
        <label>Categories</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} onClick={handleFilter}>
                <option>all</option>
                <option>art</option>
                <option>biography</option>
                <option>computers</option>
                <option>history</option>
                <option>medical</option>
                <option>poetry</option>
            </select>
        <label>Sorting by</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} onClick={handleFilter}>
                <option>relevance</option>
                <option>newest</option>
            </select>
    </div>
  )
}

export default Filters