import React from 'react';
import './GameGrid.css';
import DateLabel from './DateGameLabel';

interface Game {
  name: string;
  cover: string;
  discountPercent: number;
  price: string;
  originalPrice: string;
  discountEndDate: string;
}

interface GameGridProps {
  games: Game[];
}

const GameGrid: React.FC<GameGridProps> = ({ games }) => {
  return (
    <div id="games-grid" className="games__block">
      {games.map((game, index) => (
        <div key={index} className="game__block">
          <div className="game__img-block">
            <img src={game.cover} alt={game.name} className="game__img" />
            <div className="game__label game__label_price">Скидка {game.discountPercent}%</div>
            <DateLabel endDate={game.discountEndDate} />
          </div>
          <div className="game__description">
            <h3 className="game__title" title={game.name}>
              {game.name.length > 40 ? `${game.name.slice(0, 40)}...` : game.name}
            </h3>
            <div className="prices">
              <p className="price__new">{game.price}</p>
              <p className="price__old">{game.originalPrice}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
