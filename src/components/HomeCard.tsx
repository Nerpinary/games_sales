import React from 'react';
import './HomeCard.css';

interface HomeCardProps {
    imgSrc: string;
    imgAlt: string;
    title: string;
    backgroundColor: string;
    path: string;
}

const HomeCard: React.FC<HomeCardProps> = ({ imgSrc, imgAlt, title, backgroundColor, path }) => {
    return (
        <a href={path} className='home__card' style={{backgroundColor: backgroundColor}}>
            <img className='home__card-img' src={imgSrc} alt={imgAlt} />
            <h2 className='home__card-title'>{title}</h2>
        </a>
    )
};

export default HomeCard;