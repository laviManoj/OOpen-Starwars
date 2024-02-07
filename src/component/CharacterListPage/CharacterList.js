import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CharacterList.css'; // Import CSS file for styling

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    fetchCharacters('https://swapi.dev/api/people/');
  }, []);

  const fetchCharacters = async (url) => {
    try {
      const response = await axios.get(url);
      setCharacters(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchCharacters(nextPage);
      setCurrentPage(prev => prev + 1); // Increment current page
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchCharacters(prevPage);
      setCurrentPage(prev => prev - 1); // Decrement current page
    }
  };

  const calculateSlNo = (index) => {
    return (currentPage - 1) * 10 + index + 1;
  };

  const toggleFavorite = (character) => {
    const index = favorites.findIndex((fav) => fav.name === character.name);
    if (index === -1) {
      const updatedFavorites = [...favorites, character];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className="character-list-container">
      <h1 className='heading-name'>Star Wars Characters</h1>
      <table className="character-table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character, index) => (
            <tr key={index}>
              <td>{calculateSlNo(index)}</td> {/* Sl No */}
              <td>{character.name}</td>
              <td>{character.height}</td>
              <td>{character.mass}</td>
              <td>
                <button className="btn-single" onClick={() => toggleFavorite(character)}>
                  {favorites.some((fav) => fav.name === character.name) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <Link to={`/character/${calculateSlNo(index)}`}><button>Details</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={!prevPage}>Previous Page</button>
        <button onClick={handleNextPage} disabled={!nextPage}>Next Page</button>
      </div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>{favorite.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
