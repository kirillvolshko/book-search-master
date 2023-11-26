import React from 'react';
import './App.css';
import Main from './components/Main/Main';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BookDetailpage from './components/BookDetailPage/BookDetailpage';
const App: React.FC = ()  =>{
  return (
    <div className="App">
      <Router>
       <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/book/:id" element={<BookDetailpage />}/> 
      </Routes>
    </Router>
    </div>
  );
}

export default App;
