import React from "react";

const API_KEY = "7ab6a23f";

const MovieList = ({ movies, setSelectedMovie }) => {

  const getUserRating = (id) => {
    return Number(localStorage.getItem(`rating_${id}`)) || 0;
  };

  const handleClick = (movie) => {
    fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMovie({
          id: data.imdbID,
          title: data.Title,
          image:
            data.Poster !== "N/A"
              ? data.Poster
              : "https://via.placeholder.com/300",
          genre: data.Genre,
          year: data.Year,
          rating: Math.round(parseFloat(data.imdbRating)) || 0,
          plot: data.Plot,
          runtime: data.Runtime,
          cast: data.Actors,
          director: data.Director,
        });
      });
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {movies.length === 0 ? (
        <h2 className="text-center col-span-4">No movies found</h2>
      ) : (
        movies.map((movie) => (
          <div
          key={movie.id + Math.random()}
            onClick={() => handleClick(movie)}
            className="bg-white shadow rounded cursor-pointer hover:scale-105 transition"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-3">
              <h2 className="text-lg font-bold">{movie.title}</h2>

              <p className="text-gray-600">
                {movie.genre || "N/A"}
              </p>

              <p className="text-gray-500 text-sm">
                {movie.year}
              </p>

              <div className="text-yellow-500">
                Avg: {"⭐".repeat(movie.rating)}
              </div>

              {getUserRating(movie.imdbID) > 0 && (
                <div className="text-green-500 text-sm">
                  Your: {"⭐".repeat(getUserRating(movie.imdbID))}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieList;