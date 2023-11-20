import './App.css';
import Gauge from './Components/Gauge';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/gauge' element={<Gauge />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
