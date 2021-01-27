import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [today, setToday] = useState("");
  const [result, setResult] = useState("");
  const [gif, setGif] = useState("https://giphy.com/embed/JtBZm3Getg3dqxK0zP");

  function stockURL(name) {
    var name = name.toUpperCase();
    return (
      "https://finnhub.io/api/v1/quote?symbol=" +
      name +
      "&token=c07um4f48v6uu9ck9l4g"
    );
  }

  //error handler
  function errorHandler(error) {
    console.log(error);
    alert("Something wrong in the server .Please try again");
  }

  function calculate() {
    //fetching data

    fetch(stockURL(name))
      .then((response) => response.json())
      .then((event) => {
        var out = event.c;
        setToday(out);
        var prviousamnt = price * count;
        console.log(prviousamnt);

        var curamnt = out * count;
        console.log(curamnt);

        var calc = parseInt(curamnt) - parseInt(prviousamnt);
        calc = calc.toFixed(2);
        console.log(calc);

        var per = (calc / prviousamnt) * 100;
        var percent = per.toFixed(2);

        if (calc > 0) {
          var win = "https://giphy.com/embed/Tex4wVhhs4iwKoV7YT";
          setGif(win);
          setResult(
            "You made profit of " + percent + "% which is " + calc + " rupees"
          );
        } else if (calc < 0) {
          var los = "https://giphy.com/embed/3ov9jRAkiY4GMsJJHa";
          setGif(los);
          calc = calc * -1;
          var per = (calc / prviousamnt) * 100;
          percent = per.toFixed(2);
          setResult(
            "You have lost " + percent + "% which is " + calc + " rupees"
          );
        } else if (calc == 0) {
          setResult("You didnt gain/loss anything!.");
        }
      })
      .catch(errorHandler);

    console.log(today);

    //calculating profit or loss
  }

  return (
    <div className="App">
      <div className="box">
        <h1>Stock Manager </h1>

        <label>
          <input
            onInput={(event) => setName(event.target.value)}
            type="text"
            id="companyname"
            name="name"
            placeholder="Stock name"
            required
          ></input>
          <p>
            <b>Note: </b>Only US stocks are supported. <br></br> (eg: AAPL
            ,GOOG, HOG, INTC, TSLA)
          </p>
        </label>
        <br></br>
        <label>
          <input
            onInput={(event) => setPrice(event.target.value)}
            type="text"
            id="stockprice"
            name="price"
            placeholder="Purchased stock price "
            required
          ></input>
          <p>
            <b>Note:</b> Enter the price when you<br></br> purchased.
          </p>
        </label>
        <br></br>
        <label>
          <input
            onInput={(event) => setCount(event.target.value)}
            type="text"
            id="noofstocks"
            name="stocks"
            className="col"
            placeholder="No. of stocks purchased"
            required
          ></input>
        </label>
        <br></br>
        <button onClick={calculate} id="submit">
          Submit
        </button>
        <br></br>

        <output className="output">
          {result}
          <div className="gif">
            <iframe className="img" src={gif} frameBorder="0"></iframe>
          </div>
        </output>
      </div>
      <div className="pinkbig"></div>
      <div className="pinkmeadium"></div>
      <div className="pinksmall"></div>
      <footer className="foot">
        <p>Connect with me</p>
        <ul className="unlist">
          <li className="list">
            <a href="https://twitter.com/thelogeshwaran">
              <img src="twitter.svg" className="icon"></img>
            </a>
          </li>
          <li className="list">
            <a href="https://github.com/thelogeshwaran">
              <img src="github.svg" className="icon"></img>
            </a>
          </li>
          <li className="list">
            <a href="https://www.instagram.com/thelogeshwaran_/">
              <img src="instagram.svg" className="icon"></img>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
