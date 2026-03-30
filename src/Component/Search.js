import React from "react";

const Search = ({ search, setSearch, genre, setGenre, year, setYear }) => {
  return (
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px", textAlign: "center" }}>

      {/* Search with X */}
      <div style={{ marginBottom: "15px", position: "relative", display: "inline-block" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
          style={{ padding: "8px", width: "300px", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        {search && (
          <span
            onClick={() => setSearch("")}
            style={{ position: "absolute", right: "10px", top: "8px", cursor: "pointer" }}
          >
            ✖
          </span>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option>All Genres</option>
          <option>Action</option>
          <option>Drama</option>
          <option>Comedy</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option>All Years</option>
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
          <option>2020</option>
          <option>2019</option>
        </select>

        {/* Clear Button */}
        {(search || genre !== "All Genres" || year !== "All Years") && (
          <button
            onClick={() => {
              setSearch("");
              setGenre("All Genres");
              setYear("All Years");
            }}
            style={{ padding: "8px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;