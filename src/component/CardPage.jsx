import React from "react";
import { useState, useEffect } from "react";
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
        setData(data1);
        console.log(data1);
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      }
    };
    getCountries();
    // fetch(apiUrl)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data);
    //   })
    //   .catch((error) => console.error(`Error fetching data:${error.message}`));
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
          .map((ele) => {
            return (
              <FlagCard
                key={`${ele.name.common}${Math.floor(Math.random() * 90) + 10}`}
                flag={ele.flags.png}
                name={ele.name.common}
                alth={ele.flag}
              />
            );
          })}
      </div>
    </>
  );
};
export default CardPage;
