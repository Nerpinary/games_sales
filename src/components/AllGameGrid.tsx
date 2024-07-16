import React from 'react';
import './GameGrid.css';

interface Game {
  name: string;
  productImage: string;
  price: string;
  releaseDate: string;
  categories: string[];
  urlKey: string;
}

interface AllGameGridProps {
  games: Game[];
}

const AllGameGrid: React.FC<AllGameGridProps> = ({ games }) => {
  return (
    <div id="games-grid" className="games__block">
      {games.map((game, index) => (
        <div key={index} className="game__block">
          <div className="game__img-block">
            <img src={`https://assets.nintendo.com/image/fetch/q_auto/f_auto/https://atum-img-lp1.cdn.nintendo.net/i/c/${game.productImage}`} alt={game.name} className="game__img" />
          </div>
          <div className="game__description">
            <h3 className="game__title" title={game.name}>
              {game.name.length > 40 ? `${game.name.slice(0, 40)}...` : game.name}
            </h3>
            <div className="prices">
              <p className="price__new">${game.price}</p>
            </div>
            <p className="release-date">Release Date: {new Date(game.releaseDate).toLocaleDateString()}</p>
            <p className="categories">Categories: {game.categories.join(', ')}</p>
            <a href={`https://www.nintendo.com/store/products/${game.urlKey}`} target="_blank" rel="noopener noreferrer" className="game__link">View on Nintendo Store</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllGameGrid;
