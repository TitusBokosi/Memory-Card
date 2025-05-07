import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [heighstScore, setHighestScore] = useState(0);
  const apiKey = "yYEw87iIjg8bbIiWcnx9jDUSQ5rcuKWn";
  const [imageUrl, setImageUrl] = useState([]);
  const [clicked, setClicked] = useState([]);

  async function getGiphy() {
    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=cats&limit=10`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Http error! status: ${response.status}`);
      }
      const data = await response.json();

      const urls = data.data.map((image) => image.images.original.url);
      setImageUrl(urls);
    } catch (error) {
      console.error("Error fetching gifs: ", error);
    }
  }
  useEffect(() => {
    getGiphy();
  }, []);

  function handleClick(event) {
    if (clicked.includes(event.target.src)) {
      if (currentScore > heighstScore) {
        setHighestScore(currentScore);
      }
      setClicked([]);
      setCurrentScore(0);
    } else {
      setCurrentScore(currentScore + 1);
      setClicked([...clicked, event.target.src]);
    }
    const newImages = [...imageUrl].sort(() => Math.random() - 0.5);
    setImageUrl(newImages);
  }
  return (
    <>
      <header className="header">
        <div className="header-text">
          <h1>Tees Memory Card</h1>
          <div className="result-board">
            <p className="current-score">Current score: {currentScore}</p>
            <p className="heighst-score">Highest score: {heighstScore} </p>
          </div>
        </div>
        <p>
          Click on a single container not morethan once to score a single point
        </p>
      </header>
      <div className="images-container">
        {imageUrl.map((url, index, id) => (
          <div className="gif-container">
            <img
              className="gif-image"
              key={index}
              src={url}
              id={id}
              alt={`Cat GIF ${index + 1}`}
              onClick={handleClick}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
