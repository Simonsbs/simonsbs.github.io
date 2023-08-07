import React from "react";

function Pricebox({ pricebox: { name, price, icon, content, recommended } }) {
  return (
    <div
      className={
        recommended
          ? "price-item text-center recommended"
          : "price-item text-center"
      }
    >
      <i className={`price-icon ${icon}`}></i>
      <span className="plan">{name}</span>
      <h3 className="price">
        <em>$</em>
        {price}
        <span>/mo</span>
      </h3>
      <div className="price-content">
        <ul>
          {content.map((list, index) => (
            <li key={index}>{list}</li>
          ))}
        </ul>
      </div>
      <a href="#!" className="btn btn-default">
        Get Started
      </a>
    </div>
  );
}

export default Pricebox;
