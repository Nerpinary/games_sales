import React from 'react';
import './HomeCard.css';

interface HomeCardProps {
    imgSrc: string;
    imgAlt: string;
    title: string;
    backgroundColor: string;
}

const HomeCard: React.FC<HomeCardProps> = ({ imgSrc, imgAlt, title, backgroundColor }) => {
    return (
        <div className='home__card' style={{backgroundColor: backgroundColor}}>
            <img className='home__card-img' src={imgSrc} alt={imgAlt} />
            <h2 className='home__card-title'>{title}</h2>
        </div>
    )
};

export default HomeCard;