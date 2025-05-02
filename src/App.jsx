import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [heighstScore, setHighestScore] = useState(0);
  const apiKey = "yYEw87iIjg8bbIiWcnx9jDUSQ5rcuKWn";
  const [imageUrl, setImageUrl] = useState("");
  async function getGiphy() {
    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=10&q=cats`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Http error! status: ${response.status}`);
      }
      const data = await response.json();
      setImageUrl(data.data[0].images.original.url);
    } catch (error) {
      console.error("Error fetching gifs: ", error);
    }
  }
  useEffect(() => {
    getGiphy();
  }, [imageUrl]);

  return (
    <>
      <header className="header">
        <div className="header-text">
          <h1>Tees Memory Card</h1>
          <p>
            Click on a single container not morethan once to score a single
            point
          </p>
        </div>
        <div className="result-board">
          <p className="current-score">Current score: {currentScore}</p>
          <p className="heighst-score">Highest score: {heighstScore} </p>
        </div>
        <img src={imageUrl} alt="" />
      </header>
    </>
  );
}

export default App;
