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
      {games.map((game, index) => {
        const imageUrl = game.productImage.startsWith('http')
          ? game.productImage
          : `https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/c_scale,w_300/${game.productImage}`;

        return (
          <a
            target='_blank'
            href={`https://www.nintendo.com/store/products/${game.urlKey}`}
            key={index}
            className="game__block"
          >
            <div className="game__img-block">
              <img src={imageUrl} alt={game.name} className="game__img" />
            </div>
            <div className="game__description">
              <h3 className="game__title" title={game.name}>
                {game.name.length > 40 ? `${game.name.slice(0, 40)}...` : game.name}
              </h3>
              <div className="prices">
                <p className="price__new">${game.price}</p>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default AllGameGrid;
