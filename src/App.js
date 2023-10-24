import "./styles.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function App() {
  useEffect(() => {
    axios
      .get("https://api.dictionaryapi.dev/api/v2/entries/en/javascript")
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, []);
  let city = useRef("");

  const [data, setData] = useState({});
  console.log({ city: city.current.value });
  const btn = (e) => {
    console.log({ city: city.current.value });
    axios
      .get("https://api.weatherapi.com/v1/current.json", {
        params: {
          Key: "93c03ec9fdf74105852175001231710",
          q: city.current.value
        }
      })
      .then((res) => {
        setData({
          humidity: res.data.current.humidity + "%",
          temp: res.data.current.temp_c + "\u00b0" + "C",
          wind: res.data.current.wind_kph + "kph",
          condition: res.data.current.condition.text
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <input type="text" placeholder="Enter City" ref={city} />
      <button className="btn" onClick={btn}>
        Search
      </button>
      {city.current.value === undefined ? (
        <div className="text">
          <h1>Enter City name to get Whether Report</h1>
        </div>
      ) : (
        <div className="content">
          {Object.keys(data).map((i) => {
            return (
              <div>
                <h1>{i}</h1>
                <p>{data[i]}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
