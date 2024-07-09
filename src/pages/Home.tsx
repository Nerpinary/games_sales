import React, { useState, useEffect } from 'react';
import { fetchGames } from '../api/api';

const Home: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames(currentPage, pageSize);
        setGames(data.results);
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (error) {
        console.error('Failed to load games:', error);
      }
    };
    loadGames();
  }, [currentPage]);

  return (
    <main>
      <h1>Games on Sale</h1>
      <div id="content" className="content">
        <p id="total-games" className="games__total">Всего игр по скидке сегодня: {games.length}</p>
        <div id="pagination-top" className="pagination"></div>
        <div id="games-grid" className="games__block">
          {games.map(game => (
            <div key={game.id} className="game__block">
              <div className="game__img-block">
                <img src={game.cover} alt={game.name} className="game__img" />
                <div className="game__label">Скидка {game.discountPercent}%</div>
              </div>
              <div className="game__description">
                <h3 className="game__title" title={game.name}>{game.name.length > 40 ? game.name.slice(0, 40) + '...' : game.name}</h3>
                <div className="prices">
                  <p className="price__new">{game.price}</p>
                  <p className="price__old">{game.originalPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div id="pagination-bottom" className="pagination"></div>
      </div>
    </main>
  );
};

export default Home;
