const ExpressError = require("./ExpressError");

async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "DevByAc-AirbnbApp", 
    },
  });
  const data = await response.json();

  if (data.length === 0) {
    throw new ExpressError("Location not found");
  }

  const { lat, lon } = data[0];
  return {
    lat: parseFloat(lat),
    lon: parseFloat(lon),
  };
}

module.exports = geocodeAddress;
