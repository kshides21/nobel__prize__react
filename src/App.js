import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Awardee from './pages/Awardee';

function App() {
  return (
   <Router>
    <div className="App">
       <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/search/:id' element={<Search />}></Route>
        <Route path='/awardee/:id' element={<Awardee />}></Route>
       </Routes>
    </div>
    </Router> 
  );
}

export default App;
