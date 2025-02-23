
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { getMovies, setTotalResults, setLoading, setError } from "../redux/movieSlice";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./MovieList.css"; // Import the CSS file for styling

// interface Movie {
//   Title: string;
//   Year: string;
//   Type: string;
//   Poster: string;
// }

// const MovieList: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("american");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const { movies, totalResults, loading, error } = useSelector((state: RootState) => state.movies);
//   const dispatch = useDispatch();

//   const location = useLocation();
//   const navigate = useNavigate();

//   const OMDB_API_KEY = "d935aee9"; // Replace with your OMDB API key

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const search = searchParams.get("s") || "american";
//     const page = Number(searchParams.get("p")) || 1;
//     const type = searchParams.get("type") || "";

//     setSearchTerm(search);
//     setCurrentPage(page);
//     setTypeFilter(type);

//     fetchMovies(search, page, type);
//   }, [location.search]);

//   const fetchMovies = async (search: string, page: number, type: string) => {
//     dispatch(setLoading(true));
//     try {
//       const typeQuery = type ? `&type=${type}` : "";
//       const response = await axios.get(
//         `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${search}&page=${page}${typeQuery}`
//       );
//       if (response.data.Response === "True") {
//         dispatch(getMovies(response.data.Search));
//         dispatch(setTotalResults(Number(response.data.totalResults)));
//         dispatch(setError(null));  // Clear any previous error
//       } else {
//         dispatch(setError(response.data.Error || "No results found."));
//         dispatch(getMovies([]));  // Clear movies if no results found
//         dispatch(setTotalResults(0)); // Set total results to 0
//       }
//     } catch (error) {
//       dispatch(setError("Failed to fetch movies. Please try again."));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const handleSearch = () => {
//     navigate(`/?s=${searchTerm}&p=1&type=${typeFilter}`);
//     fetchMovies(searchTerm, 1, typeFilter);
//   };

//   const handlePageChange = (newPage: number) => {
//     navigate(`/?s=${searchTerm}&p=${newPage}&type=${typeFilter}`);
//     fetchMovies(searchTerm, newPage, typeFilter);
//   };

//   const handleTypeChange = (newType: string) => {
//     setTypeFilter(newType);
//     dispatch(setError(null));  // Clear error state when changing filters
//     navigate(`/?s=${searchTerm}&p=1&type=${newType}`);
//     fetchMovies(searchTerm, 1, newType);
//   };

//   return (
//     <div className="movie-list">
//       <h1>Video Catalog</h1>
//       <div className="search-bar">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search movies..."
//         />
//         <button onClick={handleSearch}>Search</button>
//         <div className="filter-buttons">
//           <button
//             onClick={() => handleTypeChange("")}
//             className={typeFilter === "" ? "active" : ""}
//           >
//             ANY
//           </button>
//           <button
//             onClick={() => handleTypeChange("movie")}
//             className={typeFilter === "movie" ? "active" : ""}
//           >
//             movie
//           </button>
//           <button
//             onClick={() => handleTypeChange("series")}
//             className={typeFilter === "series" ? "active" : ""}
//           >
//             series
//           </button>
//           <button
//             onClick={() => handleTypeChange("episode")}
//             className={typeFilter === "episode" ? "active" : ""}
//           >
//             episode
//           </button>
//         </div>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <div className="myDiv">{error}</div>}  {/* Display error or 'No results found' message */}

//       {!loading && !error && movies.length === 0 && (
//         <div className="myDiv">No results found for "{searchTerm}" with filter "{typeFilter}".</div>
//       )}

//       {!loading && !error && movies.length > 0 && (
//         <div>
//           <div className="movie-grid">
//             {movies.map((movie: Movie, index: number) => (
//               <div key={index} className="movie-card">
//                 <img className="movie-poster" src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"} alt={movie.Title} />
//                 <div className="movie-info">
//                   <h3>{movie.Title}</h3>
//                   <p>{movie.Year}</p>
//                   <span className="movie-type">{movie.Type}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="pagination">
//             <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//               &laquo;
//             </button>
//             <span>
//               {currentPage} of {Math.ceil(totalResults / 10)}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage >= Math.ceil(totalResults / 10)}
//             >
//               &raquo;
//             </button>
//           </div>
//           <p>
//             Showing {movies.length} of {totalResults} results.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieList;




// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { getMovies, setTotalResults, setLoading, setError } from "../redux/movieSlice";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./MovieList.css"; 
// import debounce from "lodash.debounce";

// interface Movie {
//   Title: string;
//   Year: string;
//   Type: string;
//   Poster: string;
// }

// const MovieList: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("american");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const { movies, totalResults, loading, error } = useSelector((state: RootState) => state.movies);
//   const dispatch = useDispatch();

//   const location = useLocation();
//   const navigate = useNavigate();

//   const OMDB_API_KEY = "d935aee9"; 

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const search = searchParams.get("s") || "american";
//     const page = Number(searchParams.get("p")) || 1;
//     const type = searchParams.get("type") || "";

//     setSearchTerm(search);
//     setCurrentPage(page);
//     setTypeFilter(type);

//     fetchMovies(search, page, type);
//   }, [location.search]);

//   const fetchMovies = async (search: string, page: number, type: string) => {
//     dispatch(setLoading(true));
//     try {
//       const typeQuery = type ? `&type=${type}` : "";
//       const response = await axios.get(
//         `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${search}&page=${page}${typeQuery}`
//       );
//       if (response.data.Response === "True") {
//         dispatch(getMovies(response.data.Search));
//         dispatch(setTotalResults(Number(response.data.totalResults)));
//         dispatch(setError(null));  
//       } else {
//         dispatch(setError(response.data.Error || "No results found."));
//         dispatch(getMovies([])); 
//         dispatch(setTotalResults(0)); 
//       }
//     } catch (error) {
//       dispatch(setError("Failed to fetch movies. Please try again."));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };


//   const debouncedSearch = useCallback(
//     debounce((value: string) => {
//       navigate(`/?s=${value}&p=1&type=${typeFilter}`);
//       fetchMovies(value, 1, typeFilter);
//     }, 500), 
//     [typeFilter, navigate]
//   );

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//     debouncedSearch(event.target.value);
//   };

//   const handlePageChange = (newPage: number) => {
//     navigate(`/?s=${searchTerm}&p=${newPage}&type=${typeFilter}`);
//     fetchMovies(searchTerm, newPage, typeFilter);
//   };

//   const handleTypeChange = (newType: string) => {
//     setTypeFilter(newType);
//     dispatch(setError(null));  // Clear error state when changing filters
//     navigate(`/?s=${searchTerm}&p=1&type=${newType}`);
//     fetchMovies(searchTerm, 1, newType);
//   };

//   return (
//     <div className="movie-list">
//       <h1>Video Catalog</h1>
//       <div className="search-bar">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleSearchChange}//2-way
//           placeholder="Search movies..."
//         />
//         <div className="filter-buttons">
//           <button
//             onClick={() => handleTypeChange("")}
//             className={typeFilter === "" ? "active" : ""}
//           >
//             ANY
//           </button>
//           <button
//             onClick={() => handleTypeChange("movie")}
//             className={typeFilter === "movie" ? "active" : ""}
//           >
//             movie
//           </button>
//           <button
//             onClick={() => handleTypeChange("series")}
//             className={typeFilter === "series" ? "active" : ""}
//           >
//             series
//           </button>
//           <button
//             onClick={() => handleTypeChange("episode")}
//             className={typeFilter === "episode" ? "active" : ""}
//           >
//             episode
//           </button>
//         </div>
//       </div>

//       {loading && <div className="myDiv1">Loading...</div>}
//       {error && <div className="myDiv">{error}</div>}  {/* Display error or 'No results found' message */}

//       {!loading && !error && movies.length === 0 && (
//         <p>No results found for "{searchTerm}" with filter "{typeFilter}".</p>
//       )}

//       {!loading && !error && movies.length > 0 && (
//         <div>
//           <div className="movie-grid">
//             {movies.map((movie: Movie, index: number) => (
//               <div key={index} className="movie-card">
//                 <img className="movie-poster" src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"} alt={movie.Title} />
//                 <div className="movie-info">
//                   <h3>{movie.Title}</h3>
//                   <p>{movie.Year}</p>
//                   <span className="movie-type">{movie.Type}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="pagination">
//             <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//               &laquo;
//             </button>
//             <span>
//               {currentPage} of {Math.ceil(totalResults / 10)}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage >= Math.ceil(totalResults / 10)}
//             >
//               &raquo;
//             </button>
//           </div>
//           <p>
//             Showing {movies.length} of {totalResults} results.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieList;





import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getMovies, setTotalResults, setLoading, setError } from "../redux/movieSlice";
import { useLocation, useNavigate } from "react-router-dom";
import "./MovieList.css"; 
import debounce from "lodash.debounce";

interface Movie {
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

const MovieList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("american");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { movies, totalResults, loading, error } = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const OMDB_API_KEY = "d935aee9"; 

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get("s") || "american";
    const page = Number(searchParams.get("p")) || 1;
    const type = searchParams.get("type") || "";

    setSearchTerm(search);
    setCurrentPage(page);
    setTypeFilter(type);

    fetchMovies(search, page, type);
  }, [location.search]);

  const fetchMovies = async (search: string, page: number, type: string) => {
    if (!search.trim()) {
      dispatch(getMovies([]));
      dispatch(setTotalResults(0));
      dispatch(setError(null));
      return; 
    }

    dispatch(setLoading(true));
    try {
      const typeQuery = type ? `&type=${type}` : "";
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${search}&page=${page}${typeQuery}`
      );
      if (response.data.Response === "True") {
        dispatch(getMovies(response.data.Search));
        dispatch(setTotalResults(Number(response.data.totalResults)));
        dispatch(setError(null));  
      } else {
        dispatch(setError(response.data.Error || "No results found."));
        dispatch(getMovies([]));  
        dispatch(setTotalResults(0)); 
      }
    } catch (error) {
      dispatch(setError("Failed to fetch movies. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (!value.trim()) {
        dispatch(getMovies([])); 
        dispatch(setTotalResults(0));
        dispatch(setError(null));
      } else {
        navigate(`/?s=${value}&p=1&type=${typeFilter}`);
        fetchMovies(value, 1, typeFilter);
      }
    }, 500), 
    [typeFilter, navigate]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/?s=${searchTerm}&p=${newPage}&type=${typeFilter}`);
    fetchMovies(searchTerm, newPage, typeFilter);
  };

  const handleTypeChange = (newType: string) => {
    setTypeFilter(newType);
    dispatch(setError(null));  
    navigate(`/?s=${searchTerm}&p=1&type=${newType}`);
    fetchMovies(searchTerm, 1, newType);
  };

  return (
    <div className="movie-list">
      <h1>Video Catalog</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}  //2-way
          placeholder="Search movies..."
        />
        <div className="filter-buttons">
          <button
            onClick={() => handleTypeChange("")}
            className={typeFilter === "" ? "active" : ""}
          >
            ANY
          </button>
          <button
            onClick={() => handleTypeChange("movie")}
            className={typeFilter === "movie" ? "active" : ""}
          >
            movie
          </button>
          <button
            onClick={() => handleTypeChange("series")}
            className={typeFilter === "series" ? "active" : ""}
          >
            series
          </button>
          <button
            onClick={() => handleTypeChange("episode")}
            className={typeFilter === "episode" ? "active" : ""}
          >
            episode
          </button>
        </div>
      </div>

      {loading && <div className="myDiv1">Loading...</div>}
      {error && <div className="myDiv">{error}</div>}  {/* Display error or 'No results found' message */}

      {!loading && !error && movies.length === 0 && (
        <div className="myDiv1">No results found for "{searchTerm}" with filter "{typeFilter}".</div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div>
          <div className="movie-grid">
            {movies.map((movie: Movie, index: number) => (
              <div key={index} className="movie-card">
                <img className="movie-poster" src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"} alt={movie.Title} />
                <div className="movie-info">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                  <span className="movie-type">{movie.Type}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              &laquo;
            </button>
            <span>
              {currentPage} of {Math.ceil(totalResults / 10)}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= Math.ceil(totalResults / 10)}
            >
              &raquo;
            </button>
          </div>
          <p>
            Showing {movies.length} of {totalResults} results.
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieList;
