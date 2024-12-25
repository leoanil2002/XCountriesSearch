import React, { useState, useEffect } from "react";
import FlagCard from "./FlagCard";
import "./CardPage.css";

const CardPage = () => {
  const apiUrl = "https://xcountries-backend.azurewebsites.net/all"; // Use this API URL
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched Countries Data:", result);

        // Transform data to match the structure used in the application
        const transformedData = result.map((country) => ({
          name: country.countryName,
          flag: country.flagImage,
        }));
        setData(transformedData);
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error(`Error fetching countries data: ${error.message}`);
        setLoading(false); // Stop loading on error
      }
    };
    getCountries();
  }, []);

  const handler = (e) => {
    setName(e.target.value);
  };

  const filteredData = data.filter((ele) =>
    ele.name.toLowerCase().includes(name.toLowerCase())
  );

  console.log("Filtered Data:", filteredData);

  return (
    <>
      <div className="input-box-container">
        <input
          type="text"
          onChange={handler}
          className="input-box"
          placeholder="Enter Country Name"
        />
      </div>
      <div className="cardPage">
  {data.length > 0 ? (
    data
      .filter((ele) => ele.name && ele.name.common && ele.name.common.toLowerCase().includes(name.toLowerCase()))
      .map((ele) => (
        <FlagCard
          key={ele.cca3 || ele.name.common} // Use a unique key
          flag={ele.flags?.png}
          name={ele.name?.common}
          alth={ele.flag}
        />
      ))
  ) : (
    <p>Loading countries...</p>
  )}
</div>

    </>
  );
};

export default CardPage;
