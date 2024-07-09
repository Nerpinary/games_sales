import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  const handlePlatformClick = (platform: string) => {
    // Add your platform change logic here
  };

  return (
    <header className="header">
      <div className="header__left">
        <img className="header__logo" src="./sourse/logo.png" alt="logo" />
      </div>
      <div className="header__middle">
        <ul className="header__links">
          <li
            className="header__list-item"
            id="link-nintendo"
            onClick={() => handlePlatformClick('Nintendo')}
          >
            <img className="header__link-icon" src="./sourse/icons/icon-switch.svg" alt="Nintendo" />
            <p className="header__link">Nintendo</p>
          </li>
          <li
            className="header__list-item"
            id="link-ps"
            onClick={() => handlePlatformClick('Play Station')}
          >
            <img className="header__link-icon" src="./sourse/icons/icon-ps.svg" alt="PS" />
            <p className="header__link">Play Station</p>
          </li>
          <li
            className="header__list-item"
            id="link-steam"
            onClick={() => handlePlatformClick('Steam')}
          >
            <p className="header__link">Steam</p>
          </li>
        </ul>
      </div>
      <div className="header__right">
        <select className="select__region">
          <option value="US">🇺🇸 US</option>
        </select>
      </div>
    </header>
  );
};

export default Header;