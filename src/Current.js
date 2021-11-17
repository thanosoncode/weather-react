import React from "react";
import { useGlobalContext } from "./context";

const Current = () => {
  const { current } = useGlobalContext();
  const { temp_c, feelslike_c, condition, wind_dir, wind_kph, humidity } =
    current;

  return (
    <>
      {current && (
        <div className="current">
          <div className="info">
            <p className="current-temp">{temp_c}°C</p>
            <img src={condition.icon} alt="" />
            <p>{condition.text}</p>
          </div>
          <table>
            <tr>
              <td>Feels like</td>
              <td style={{ textAlign: "right" }}>
                <strong>{feelslike_c}°C</strong>
              </td>
            </tr>
            <tr>
              <td>Humidity</td>
              <td style={{ textAlign: "right" }}>
                <strong>{humidity}%</strong>
              </td>
            </tr>
            <tr>
              <td>Wind</td>
              <td>
                <strong>
                  {wind_dir} {wind_kph}kph
                </strong>
              </td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
};

export default Current;
