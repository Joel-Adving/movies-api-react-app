import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?api_key=c221cd150085093cb616c78dc3829b66&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=c221cd150085093cb616c78dc3829b66&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <header>
        <div className="navbar-container">
          {/* <div className="left-header">
             <div className="movie-icon icon-container">
              <i class="fas fa-film icons"></i>
              <p>Movies</p>
            </div> 
             <div className="series-icon icon-container">
              <i class="fas fa-tv icons"></i>
              <span>Tv Series</span>
            </div> 
          </div> */}
          <button className="logo-container" onClick={refreshPage}>
            {/* <i class="fas fa-video"></i> */}
            <i class="fas fa-film icons"></i>
            <h1 className="logo"> Movies</h1>
          </button>
          <form onSubmit={handleOnSubmit}>
            <input
              className="search"
              type="search"
              placeholder="search..."
              value={searchTerm}
              onChange={handleOnChange}
            />
          </form>
        </div>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
