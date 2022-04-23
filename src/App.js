import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Home from './components/Home';
import List from './components/List';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/list/:user/:repo' element={<List/>}/>
          <Route path='/detail/:repo/:number' element={<Detail/>}/>
        </Routes>
    </BrowserRouter> 
  );
}

export default App;
