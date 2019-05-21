/* export async function fetchLocationId(city) {
  try {
    console.log("passed city is",city)
    let response = await fetch(
      'https://www.metaweather.com/api/location/search/?query=${city}',
    );
    let responseJson = await response.json();
    console.log("locations is",responseJson);
    return responseJson[0].woeid;
  } catch (error) {
    console.error(error);
  }
} */

export const fetchAutoLocation = async() => {
  const response = await fetch(
    `https://geoip-db.com/json/}`,
  );
  const locations = await response.json();
  console.log("detected city is",locations.city);
  return locations.city;
}; 
export const fetchLocationId = async city => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/search/?query=${city}`,
  );
  const locations = await response.json();
  console.log("locations is",locations[0].woeid);
  return locations[0].woeid;
}; 

export const fetchWeather = async woeid => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/${woeid}/`,
  );
  const { title, consolidated_weather } = await response.json();
  const { weather_state_name, the_temp } = consolidated_weather[0];

  return {
    location: title,
    weather: weather_state_name,
    temperature: the_temp,
  };
};
