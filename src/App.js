import React, { useState, useEffect } from "react";
import Header from "./Component/Header";
import Search from "./Component/Search";
import MovieList from "./Component/MovieList";
import MovieDetails from "./Component/MovieDetails";

const API_KEY = "7ab6a23f";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("batman");
  const [genre, setGenre] = useState("All Genres");
  const [year, setYear] = useState("All Years");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
        );
        const data = await res.json();

        if (data.Search) {
          const detailedMovies = await Promise.all(
            data.Search.map(async (item) => {
              const res2 = await fetch(
                `https://www.omdbapi.com/?i=${item.imdbID}&apikey=${API_KEY}`
              );
              const details = await res2.json();

              return {
                id: details.imdbID,
                title: details.Title,
                image:
                  details.Poster !== "N/A"
                    ? details.Poster
                    : "https://via.placeholder.com/300",
                genre: details.Genre,
                year: details.Year,
                rating:
                  Math.round(parseFloat(details.imdbRating)) || 0,
                plot: details.Plot,
                runtime: details.Runtime,
                cast: details.Actors,
                director: details.Director,
              };
            })
          );

          setMovies(detailedMovies);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [search]);

  const filteredMovies = movies.filter((movie) => {
    return (
      (genre === "All Genres" || movie.genre.includes(genre)) &&
      (year === "All Years" || movie.year === year)
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

      <MovieList
        movies={filteredMovies}
        setSelectedMovie={setSelectedMovie}
      />

      <MovieDetails
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}

export default App;