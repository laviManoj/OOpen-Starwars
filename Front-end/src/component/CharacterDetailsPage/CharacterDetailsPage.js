// CharacterDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <p>Height: {character.height} cm</p>
      <p>Mass: {character.mass} kg</p>
      <p>Hair Color: {character.hair_color}</p>
      <p>Skin Color: {character.skin_color}</p>
      <p>Eye Color: {character.eye_color}</p>
      <p>Birth Year: {character.birth_year}</p>
      <h2>Movies</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetails;
