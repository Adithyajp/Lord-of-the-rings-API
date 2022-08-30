import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Screens/Home";


function App() {
  return (
    <div className="App">
     <Router>
          <Routes>
            <Route path="/" element={<Home />} exact />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
