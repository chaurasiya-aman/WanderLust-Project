const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const GEOCODE_URL = "https://nominatim.openstreetmap.org/search"; // free OSM geocoding

main()
  .then(() => {
    console.log("Connection to DB wanderlust successful");
    initDB();
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("Old listings deleted");

    // For each listing, get coordinates based on location + country
    const listingsWithGeo = [];

    for (const obj of initData.data) {
       obj.owner = '6918bcfd85e543a24546ec19'; 
      const query = `${obj.location}, ${obj.country}`;
      const url = `${GEOCODE_URL}?q=${encodeURIComponent(query)}&format=json&limit=1`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          obj.geometry = {
            type: "Point",
            coordinates: [parseFloat(lon), parseFloat(lat)], // GeoJSON format
          };
        } else {
          console.warn(`No coordinates found for: ${query}`);
          obj.geometry = {
            type: "Point",
            coordinates: [0, 0], // fallback
          };
        }
      } catch (geoErr) {
        console.error(`Geocoding error for ${obj.location}:`, geoErr);
        obj.geometry = {
          type: "Point",
          coordinates: [0, 0],
        };
      }

      listingsWithGeo.push(obj);
    }

    await Listing.insertMany(listingsWithGeo);
    console.log("Data initialized successfully with coordinates!");
  } catch (err) {
    console.error("Error initializing data:", err);
  } finally {
    mongoose.connection.close();
  }
};
