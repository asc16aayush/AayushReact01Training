
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieDetailsModal.css';

interface MovieDetailsModalProps {
  movieId: string;
  onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const OMDB_API_KEY = "d935aee9";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movieId}`);
        if (response.data.Response === "True") {
          setMovieDetails(response.data);
          setError(null);
        } else {
          setError("Movie details not found.");
        }
      } catch (err) {
        setError("Error fetching movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="movie-details-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h2>{movieDetails.Title}</h2>
        <p><strong>Year:</strong> {movieDetails.Year}</p>
        <p><strong>Rated:</strong> {movieDetails.Rated}</p>
        <p><strong>Genre:</strong> {movieDetails.Genre}</p>
        <p><strong>Actors:</strong> {movieDetails.Actors}</p>
        <p><strong>Plot:</strong> {movieDetails.Plot}</p> {/* Display Plot here */}
        <p><strong>IMDB Rating:</strong> {movieDetails.imdbRating}</p>
        <img src={movieDetails.Poster} alt={movieDetails.Title} />
      </div>
    </div>
  );
};

export default MovieDetailsModal;
