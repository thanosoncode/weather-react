import React, { useState, useEffect } from "react";

import { useGlobalContext } from "./context";

const HourForecast = () => {
  const { forecast, current, getClass } = useGlobalContext();
  const [hoursToShow, setHoursToShow] = useState([]);

  const getHoursToShow = () => {
    const currentHour = current.last_updated.split(" ")[1].substr(0, 2);
    const hoursLeft = forecast[0].hour.slice(currentHour);

    const hoursToHave = 12;
    const nextDayHoursNeeded = hoursToHave - hoursLeft.length;
    const nextDayHours = forecast[1].hour.slice(0, nextDayHoursNeeded);

    const totalHours = [...hoursLeft, ...nextDayHours];

    const hoursEveryTwo = totalHours.filter(
      (hour) => totalHours.indexOf(hour) % 2
    );
    return hoursEveryTwo;
  };

  useEffect(() => {
    setHoursToShow(getHoursToShow());
  }, []);

  return (
    <div className="hour-cards">
      {hoursToShow.slice(0, 6).map((hour, index) => {
        return (
          <div
            key={index}
            className={`hour-card ${getClass(hour.condition.text)}`}
          >
            <p>
              <strong>{hour.temp_c}°C</strong>
            </p>
            <img src={hour.condition.icon} alt="" />
            <p>
              <strong>{hour.condition.text}</strong>
            </p>
            <p>{hour.time.split(" ")[1]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HourForecast;
