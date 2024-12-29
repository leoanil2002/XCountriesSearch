import React, { useState, useEffect } from "react";
import FlagCard from "./FlagCard";
import "./CardPage.css";
import countries from "../countries.json";

const CardPage = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    // Load the data from the JSON file
    setData(countries);
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
