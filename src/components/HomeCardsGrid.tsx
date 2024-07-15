import React from "react";
import HomeCard from "./HomeCard";
import './HomeCardsGrid.css';

interface HomeCardProps {
  imgSrc: string;
  imgAlt: string;
  title: string;
  backgroundColor: string;
  path: string;
}

interface HomeCardsGridProps {
  cards: HomeCardProps[];
}

const HomeCardsGrid: React.FC<HomeCardsGridProps> = ({ cards }) => {
  return (
    <div className="cards__container">
      {cards.map((card, index) => (
        <div key={index}>
          <HomeCard imgSrc={card.imgSrc} imgAlt={card.imgAlt} title={card.title} backgroundColor={card.backgroundColor} path={card.path} />
        </div>
      ))}
    </div>
  );
};

export default HomeCardsGrid;
