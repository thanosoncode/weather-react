import React from "react";
import { useGlobalContext } from "./context";

const HourForecast = () => {
  const { forecast, location, current, getClass } = useGlobalContext();

  const currentHour = current.last_updated.split(" ")[1].substr(0, 2);
  const hoursLeft = forecast[0].hour.slice(currentHour);

  const hoursLeftEveryTwo = hoursLeft
    .filter((hour) => hoursLeft.indexOf(hour) % 2 == 0)
    .slice(1);

  return (
    <div className="hour-cards">
      {hoursLeftEveryTwo.slice(0, 6).map((hour, index) => {
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
