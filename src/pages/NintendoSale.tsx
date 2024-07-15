import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import GameGrid from '../components/GameGrid';

interface Game {
  name: string;
  cover: string;
  discountPercent: number;
  price: string;
  originalPrice: string;
  discountEndDate: string;
}

const NintendoSale: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGames, setTotalGames] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/discount', {
          params: {
            platformType: 'SWITCH',
            regionType: 'US',
            pageSize,
            pageNumber: currentPage,
          },
        });
        setGames(response.data.results);
        setTotalGames(response.data.count);
        setTotalPages(Math.ceil(response.data.count / pageSize));
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
        <h1>Games on Sale</h1>
        <p className="games__total">Всего игр по скидке сегодня: {totalGames}</p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={changePage}
        />
        <GameGrid games={games} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={changePage}
        />
      </main>
  );
};

export default NintendoSale;