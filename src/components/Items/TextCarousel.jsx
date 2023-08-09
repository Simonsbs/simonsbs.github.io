import { useEffect, useState } from "react";

const FADE_INTERVAL_MS = 1750;
const WORD_CHANGE_INTERVAL_MS = FADE_INTERVAL_MS * 2;
// const WORDS_TO_ANIMATE = [
//   "Hello",
//   "Ciao",
//   "Jambo",
//   "Bonjour",
//   "Salut",
//   "Hola",
//   "Nǐ hǎo",
//   "Hallo",
//   "Hej",
//   "👋🏻",
// ];

export const TextCarousel = ({ phrases }) => {
  const [fade, setFade] = useState("fade-in");
  const [wordOrder, setWordOrder] = useState(0);

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      fade === "fade-in" ? setFade("fade-out") : setFade("fade-in");
    }, FADE_INTERVAL_MS);

    return () => clearInterval(fadeTimeout);
  }, [fade]);

  useEffect(() => {
    const wordTimeout = setInterval(() => {
      setWordOrder((prevWordOrder) => (prevWordOrder + 1) % phrases.length);
    }, WORD_CHANGE_INTERVAL_MS);

    return () => clearInterval(wordTimeout);
  }, [phrases.length]);

  return <span className={fade}>{phrases[wordOrder]}</span>;
};
