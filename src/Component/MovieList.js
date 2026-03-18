import React from "react";

const MovieList = ({ movies, setSelectedMovie }) => {

  const getUserRating = (id) => {
    return Number(localStorage.getItem(`rating_${id}`)) || 0;
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.length === 0 ? (
        <h2 className="text-center col-span-4">No movies found</h2>
      ) : (
        movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="bg-white shadow rounded cursor-pointer hover:scale-105 transition"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-3">
              <h2 className="text-lg font-bold">{movie.title}</h2>
              <p className="text-gray-600">{movie.genre}</p>

              {/* ✅ Static Average */}
              <div className="text-yellow-500">
                Avg: {"⭐".repeat(movie.rating)}
              </div>

              {/* ✅ Your Rating */}
              {getUserRating(movie.id) > 0 && (
                <div className="text-green-500 text-sm">
                  Your: {"⭐".repeat(getUserRating(movie.id))}
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