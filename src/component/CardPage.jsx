import React, { useState, useEffect } from "react";
import FlagCard from "./FlagCard";
import "./CardPage.css";

const CardPage = () => {
  const apiUrl = "https://restcountries.com/v3.1/all";
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data1 = await response.json();
        console.log("Fetched Countries Data:", data1);
        setData(data1);
      } catch (error) {
        console.error(`Error fetching countries data: ${error.message}`);
      }
    };
    getCountries();
  }, []);

  const handler = (e) => {
    setName(e.target.value);
  };

  const filteredData = data.filter((ele) =>
    ele.name && ele.name.common
      ? ele.name.common.toLowerCase().includes(name.toLowerCase())
      : false
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
        {filteredData.length > 0 ? (
          filteredData.map((ele) => (
            <FlagCard
              key={ele.cca3 || ele.name.common}
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
