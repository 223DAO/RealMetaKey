import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import Header  from "./components/header";
import Home from './pages/home/home';
import Granted from './pages/granted/granted';
import Redeem from './pages/redeem/redeem';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App__main">
					<Header/>
					<div className="App__body">
            <Routes>
              <Route exact path="/" element={<Home/>}></Route>
              <Route exact path="/home" element={<Home/>}></Route>
              <Route exact path="/grant" element={<Granted/>}></Route>
              <Route exact path="/redeem" element={<Redeem/>}></Route>
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
