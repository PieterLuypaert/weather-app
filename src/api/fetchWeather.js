import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const APIKey = "6e52daf8438d59fb4873293fd664ddc4";

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      appid: APIKey,
    },
  });
  return data;
};
