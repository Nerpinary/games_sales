import React, { useState, useEffect, useCallback } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 20;

  const fetchGames = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/v1/nintendo-games');
      let gamesData = response.data;

      // Фильтрация дублирующихся элементов
      const uniqueGames = gamesData.filter((game: Game, index: number, self: Game[]) => 
        index === self.findIndex((g) => g.name === game.name)
      );

      const paginatedGames = uniqueGames.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      setGames(paginatedGames);
      setTotalGames(uniqueGames.length);
      setTotalPages(Math.ceil(uniqueGames.length / pageSize));
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <h1>Все игры Nintendo</h1>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AllGameGrid games={games} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
      />
    </main>
  );
};

export default NintendoAll;
