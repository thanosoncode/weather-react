import React from "react";
import { useGlobalContext } from "./context";

const Forecast = () => {
  const { forecast, getDay, getClass } = useGlobalContext();

  return (
    <>
      {forecast &&
        forecast.map((day, index) => {
          return (
            <div
              key={index}
              className={`forecast-card ${getClass(day.day.condition.text)}`}
            >
              <p className="day">
                {index === 0 ? "Tomorrow" : getDay(day.date, "day")}
              </p>
              <p className="month">{getDay(day.date, "month")}</p>
              <div className="condition">
                <img src={day.day.condition.icon} alt="" />
                <div>{day.day.condition.text}</div>
              </div>
              <p>Rain - {day.day.daily_chance_of_rain}%</p>
              <p>Wind - {day.day.maxwind_kph}kph</p>
              <div className="temps-container">
                <div className="temps">
                  <span>{day.day.mintemp_c}°</span>
                  <p>Low</p>
                </div>
                <div className="hyphen">-</div>
                <div className="temps">
                  <span>{day.day.maxtemp_c}°</span>
                  <p>High</p>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Forecast;
