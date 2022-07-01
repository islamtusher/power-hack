import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import SignUp from './components/singUp/SignUp';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
     </Routes>

    </div>
  );
}

export default App;
