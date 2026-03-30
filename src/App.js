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
  fetch("https://api.imdbapi.dev/titles")
    .then((res) => res.json())
    .then((data) => {
      // convert API data → your UI format
      const formatted = data.titles.map((item) => ({
        id: item.id,
        title: item.primaryTitle || "No Title",
        image: item.primaryImage?.url || "https://via.placeholder.com/300",
        genre: item.genres?.[0] || "Unknown",
        year: item.startYear || "N/A",
        rating: Math.round(item.rating?.aggregateRating || 0),
        plot: item.plot || "No description available",
        runtime: item.runtimeSeconds
          ? `${Math.floor(item.runtimeSeconds / 60)} min`
          : "N/A",
        cast: "N/A",      
        director: "N/A",  
      }));

      setMovies(formatted);
    })
    .catch((err) => console.error("Error:", err));
}, []);

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "All Genres" || movie.genre === genre) &&
      (year === "All Years" || movie.year.toString() === year)
    );
  })
  .slice(0, 10);

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