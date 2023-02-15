import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import './css/App.css'

function App() {

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
