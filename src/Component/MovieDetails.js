import React, { useState, useEffect } from "react";

const MovieDetails = ({ movie, onClose }) => {

  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (movie) {
      const saved = localStorage.getItem(`rating_${movie.id}`);
      setUserRating(saved ? Number(saved) : 0);
    }
  }, [movie]);

  const handleRating = (star) => {
    setUserRating(star);
    localStorage.setItem(`rating_${movie.id}`, star);
  };

  if (!movie) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 50 }}>

      <div style={{ backgroundColor: "white", width: "90%", maxWidth: "600px", padding: "20px", borderRadius: "8px", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>

        <button onClick={onClose} style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}>
          ✖
        </button>

        <img
          src={movie.image}
          alt={movie.title}
          style={{ width: "100%", height: "250px", objectFit: "cover", marginBottom: "15px", borderRadius: "4px" }}
        />

        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "10px" }}>{movie.title}</h2>

        <p style={{ marginBottom: "5px" }}><b>Plot:</b> {movie.plot}</p>
        <p style={{ marginBottom: "5px" }}><b>Year:</b> {movie.year}</p>
        <p style={{ marginBottom: "5px" }}><b>Genre:</b> {movie.genre}</p>
        <p style={{ marginBottom: "5px" }}><b>Runtime:</b> {movie.runtime}</p>
        <p style={{ marginBottom: "5px" }}><b>Cast:</b> {movie.cast}</p>
        <p style={{ marginBottom: "15px" }}><b>Director:</b> {movie.director}</p>

        {/* ✅ Static Average */}
        <div style={{ color: "#ffc107", marginBottom: "15px" }}>
          <b>Average Rating:</b> {"⭐".repeat(Math.round(movie.rating))}
        </div>

        {/* ✅ Your Rating */}
        <div style={{ backgroundColor: "#f0f8ff", padding: "15px", borderRadius: "4px" }}>
          {userRating === 0 ? (
            <div>
              <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Rate This Movie:</p>
              <div style={{ display: "flex", gap: "10px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(star)}
                    style={{ fontSize: "2rem", cursor: "pointer", color: "#ccc" }}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Your Rating:</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ display: "flex", gap: "5px" }}>
                  {Array(userRating).fill(0).map((_, i) => (
                    <span key={i} style={{ fontSize: "2rem", color: "#ffc107" }}>
                      ⭐
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#28a745", marginLeft: "10px" }}>{userRating}/5</span>
                <button
                  onClick={() => handleRating(0)}
                  style={{ marginLeft: "10px", padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );};

export default MovieDetails;