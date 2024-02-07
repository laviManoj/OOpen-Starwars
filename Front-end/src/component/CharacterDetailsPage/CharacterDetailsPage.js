// CharacterDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';

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
    return <Box>Loading...</Box>;
  }

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>{character.name}</Heading>
      <List mb={4}>
        <ListItem>Height: {character.height} cm</ListItem>
        <ListItem>Mass: {character.mass} kg</ListItem>
        <ListItem>Hair Color: {character.hair_color}</ListItem>
        <ListItem>Skin Color: {character.skin_color}</ListItem>
        <ListItem>Eye Color: {character.eye_color}</ListItem>
        <ListItem>Birth Year: {character.birth_year}</ListItem>
      </List>
      <Heading as="h2" mb={2}>Movies</Heading>
      <List>
        {movies.map((movie, index) => (
          <ListItem key={index}>{movie}</ListItem>
        ))}
      </List>
      <Link to="/">Back to Characters</Link>
    </Box>
  );
};

export default CharacterDetails;
