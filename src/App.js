import React, { useState, useEffect } from "react";
import Header from "./Component/Header";
import Search from "./Component/Search";
import MovieList from "./Component/MovieList";
import MovieDetails from "./Component/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [year, setYear] = useState("All Years");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "All Genres" || movie.genre === genre) &&
      (year === "All Years" || movie.year.toString() === year)
    );
  });

  return (
    <div>
      <Header />
      <Search
        search={search}
        setSearch={setSearch}
        genre={genre}
        setGenre={setGenre}
        year={year}
        setYear={setYear}
      />
      <MovieList movies={filteredMovies} setSelectedMovie={setSelectedMovie} />
      <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}

export default App;