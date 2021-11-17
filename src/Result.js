import React from "react";
import { useGlobalContext } from "./context";
import Forecast from "./Forecast";
import Location from "./Location";
import Current from "./Current";
import Loading from "./Loading";
import HourForecast from "./HourForecast";

const Result = () => {
  const { forecast, current, location, loading, getClass } = useGlobalContext();

  if (!location) {
    return <Loading />;
  }
  if (location && current && forecast) {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className="result">
            <div className={`today ${getClass(current.condition.text)}`}>
              <Location />
              <Current />
            </div>
            <HourForecast />
            <div className="forecast">
              <Forecast />
            </div>
          </div>
        )}
      </>
    );
  }
};

export default Result;
