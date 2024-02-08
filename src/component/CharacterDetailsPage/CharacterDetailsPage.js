// CharacterDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './CharacterDetailsPage.css'; // Import CSS file for styling

const CharacterDetails = () => {
  const { id } = useParams(); // Use useParams hook to get the route parameters
  const [character, setCharacter] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchCharacter(id); // Use id from useParams
  }, [id]);

  const fetchCharacter = async (id) => {
    try {
      const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
      setCharacter(response.data);
      const moviesData = await Promise.all(response.data.films.map(url => axios.get(url)));
      setMovies(moviesData.map(movie => movie.data.title));
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };

  if (!character) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="character-details-container">
      <h1 className="character-name">{character.name}</h1>
      <ul className="character-details-list">
        <li className="character-detail">Height: {character.height} cm</li>
        <li className="character-detail">Mass: {character.mass} kg</li>
        <li className="character-detail">Hair Color: {character.hair_color}</li>
        <li className="character-detail">Skin Color: {character.skin_color}</li>
        <li className="character-detail">Eye Color: {character.eye_color}</li>
        <li className="character-detail">Birth Year: {character.birth_year}</li>
      </ul>
      <h2 className="movies-heading">Movies</h2>
      <ul className="movies-list">
        {movies.map((movie, index) => (
          <li key={index} className="movie">{movie}</li>
        ))}
      </ul>
      <Link to="/" className="back-link">Back to Characters</Link>
    </div>
  );
};

export default CharacterDetails;
