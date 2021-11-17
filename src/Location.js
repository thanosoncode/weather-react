import React from "react";
import { useGlobalContext } from "./context";
import Forecast from "./Forecast";

const Location = () => {
  const { location } = useGlobalContext();
  const { country, region, name, localtime } = location;

  const getDayToday = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return days[new Date(location.localtime_epoch).getDay()];
  };

  return (
    <>
      {location && (
        <div className="location">
          <div>
            <p className="title">{getDayToday()}</p>
            <div className="local-time">{localtime}</div>
          </div>
          <div className="city">
            <strong>{name},</strong> {country}
          </div>
        </div>
      )}
    </>
  );
};

export default Location;
