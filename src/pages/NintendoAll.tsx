import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import AllGameGrid from '../components/AllGameGrid';

interface Game {
  name: string;
  productImage: string;
  price: string;
  releaseDate: string;
  categories: string[];
  urlKey: string;
}

const NintendoAll: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGames, setTotalGames] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/nintendo-games');
        const gamesData = response.data;

        setGames(gamesData);
        setTotalGames(gamesData.length); // Если количество игр приходит отдельно, можно изменить это
        setTotalPages(Math.ceil(gamesData.length / pageSize));
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();
  }, [currentPage]);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <h1>All Nintendo Switch Games</h1>
      <p className="games__total">Total games: {totalGames}</p>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
      />
      <AllGameGrid games={games} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
      />
    </main>
  );
};

export default NintendoAll;
