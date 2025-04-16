import Landing from "./componets/Landing";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Nav from "./componets/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import MovieDetails from "./pages/MovieId"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/:id" element={<MovieDetails />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
