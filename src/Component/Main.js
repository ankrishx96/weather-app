import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "./Loader";

export const Main = () => {
  const weatherApi = "4052b4fcbceb4810a86185843221906";
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [weatherDetail, setWeatherDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const userIpData = async () => {
    const res = await axios
      .get("https://ipapi.co/json")
      .catch((err) => console.log(err.message));
    setCountry(res.data.country_name);
    setCity(res.data.city);

    const weatherData = await axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${weatherApi}&q=${res.data.city}&days=5&aqi=yes&alerts=no`
      )
      .catch((err) => console.log(err.message));
    setWeatherDetail(weatherData.data);
    setLoading(false);
  };

  useEffect(() => {
    userIpData();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <h1 className="text-center p-2 fw-bolder">
                IP Based Weather App
              </h1>
              <div className="col-md-9 col-lg-8 col-xl-4  ">
                <div
                  className="card mb-4 gradient-custom"
                  style={{ borderRadius: "5px" }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h2 className="display-2">
                          <strong>{weatherDetail.current.temp_c}°C</strong>
                        </h2>
                        <p className="text-muted mb-0">
                          PM 10:{" "}
                          {Math.floor(weatherDetail.current.air_quality.pm10)},
                          PM 2.5:{" "}
                          {Math.floor(weatherDetail.current.air_quality.pm2_5)}
                        </p>
                        <p className="text-muted mb-0">
                          {city}, {country}
                        </p>
                        <p>
                          <strong>Last Updated:</strong>{" "}
                          {weatherDetail.current.last_updated}
                        </p>
                      </div>
                      <div>
                        <img
                          src={weatherDetail.current.condition.icon}
                          width="60px" alt="condition"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <h1 className="p-2 fw-bolder text-center">3 Days Forecast</h1>
            <div className="row d-flex justify-content-center align-items-center">
              {weatherDetail.forecast.forecastday.map((data) => {
                return (
                  <div className="col-xl-3 col-md-3 col-sm-6">
                    <div className="card mb-4" style={{ borderRadius: "5px" }}>
                      <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center" style={{flexWrap: 'wrap'}}>
                      <h5 className="text-center fw-bold">Forecast for {data.date} </h5>
                      <div className="text-center">
                      <img src={data.day.condition.icon} alt="condition"/>
                      <p className="fw-bolder">{data.day.condition.text}</p>
                      </div>
                      
                      <div className="mb-3">
                        <p className="mb-0 fw-bolder">Temperature</p>
                        <p className="mb-0">Max - {data.day.maxtemp_c}°C</p>
                        <p className="mb-0">Min - {data.day.mintemp_c}°C</p>
                      </div>

                      <div>
                        <p className="mb-0 fw-bolder">Other Usefull Details</p>
                        <p className="mb-0">Sunrise - {data.astro.sunrise}</p>
                        <p className="mb-0">Sunset - {data.astro.sunset}</p>
                      </div>
                      
                        <p></p>
                        <br />
                        <p></p>
                        <br />

                        <br />
                      </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
