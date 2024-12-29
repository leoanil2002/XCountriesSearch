import React, { useState, useEffect } from "react";
import FlagCard from "./FlagCard";
import "./CardPage.css";
// import countries from "../countries.json";

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
        setData(data1);
        console.log(data1); // Confirm data structure here
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      }
    };
    getCountries();
  }, []);
  

  const handler = (e) => {
    setName(e.target.value);
  };

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
        {data
          .filter((ele) =>
            ele.name.common.toLowerCase().includes(name.toLowerCase())
          )
          .map((ele) => (
            <FlagCard
              key={ele.cca3}
              flag={ele.flags.png}
              name={ele.name.common}
              alth={ele.flag}
            />
          ))}
      </div>
    </>
  );
};

export default CardPage;
