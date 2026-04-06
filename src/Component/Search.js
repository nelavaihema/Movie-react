import React from "react";

const Search = ({ search, setSearch, genre, setGenre, year, setYear }) => {
  return (
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px", textAlign: "center" }}>

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

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px" }}
        >
          <option>All Genres</option>
          <option>Action</option>
          <option>Adventure</option>
          <option>Sci-Fi</option>
           <option>Crime</option>
            <option>Drama</option>
             <option>Animation</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px" }}
        >
          <option>All Years</option>
          {[2005,2022,2016,1995,1989,1992,2017,1997].map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>

        {(search || genre !== "All Genres" || year !== "All Years") && (
          <button
            onClick={() => {
              setSearch("");
              setGenre("All Genres");
              setYear("All Years");
            }}
            style={{
              padding: "8px 15px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;