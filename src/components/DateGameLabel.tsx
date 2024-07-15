import React, { useState, useEffect } from 'react';

interface DateLabelProps {
  endDate: string;
}

const DateLabel: React.FC<DateLabelProps> = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate).getTime() - new Date().getTime();

    if (difference > 0) {
      const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);

      if (daysLeft == 1) {
        return `${daysLeft} день`
      } else if (daysLeft > 1 && daysLeft < 5) {
        return `${daysLeft} дня`
      } else if (daysLeft > 4) {
        return `${daysLeft} дней`
      } else if (daysLeft < 1 && hoursLeft == 1) {
        return `${hoursLeft} час`
      } else if (daysLeft < 1 && hoursLeft > 1 && hoursLeft < 5) {
        return `${hoursLeft} часа`
      } else if (daysLeft < 1 && hoursLeft > 4) {
        return `${hoursLeft} часов`
      }
    } else {
      return 'Акция закончилась';
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000 * 60 * 60); // Обновляем каждый час

    return () => clearInterval(timer);
  }, [endDate]);

  return <div className="game__label game__label_date">Осталось {timeLeft}</div>;
};

export default DateLabel;
