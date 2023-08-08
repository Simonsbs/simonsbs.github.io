import React from "react";

const PillBoxes = ({ items }) => {
  if (!items) {
    return <></>;
  }

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to determine if the color is dark or light
  const isColorDark = (color) => {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  return (
    <div className="d-flex justify-content-between flex-wrap">
      {items.map((item, index) => {
        const backgroundColor = getRandomColor();
        const textColor = isColorDark(backgroundColor) ? "white" : "black";

        return (
          <span
            key={index}
            className="badge rounded-pill d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: backgroundColor,
              color: textColor,
              width: "100px", // Fixed width
              height: "30px", // Fixed height
              margin: "5px", // Space between pills
            }}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default PillBoxes;
