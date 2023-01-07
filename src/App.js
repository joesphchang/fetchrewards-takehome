// React
import { Routes, Route } from 'react-router-dom';

// Stylesheets
import './App.css';

// Components
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';

function App() {
  return (
    <div className="main__container">
      <Home />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
