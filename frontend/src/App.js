import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home/home';
import Granted from './pages/granted/granted';
import Redeem from './pages/redeem/redeem';


function App() {
  const { hasLogin } = useSelector((state) => state.auth);

  return (
    <Router>
      { hasLogin ?
        <div className="App_main">
            <Routes>
              <Route path="/" element={<Granted />} />
              <Route path="/granted" element={<Granted />} />
              <Route path="/redeem" element={<Redeem />} />
            </Routes>
        </div>
        :
        <Routes>
          <Route path="/" element={<Home/>} />
          <Navigate to={"/"} />
        </Routes>
      }
    </Router>
  );
}

export default App;
