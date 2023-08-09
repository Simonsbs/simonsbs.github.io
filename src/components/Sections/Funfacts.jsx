import React from "react";
import TrackVisibility from "react-on-screen";
import Funfact from "../Items/Funfact";

function daysSince1988() {
  const startDate = new Date("1988-01-01");
  const currentDate = new Date();
  const differenceInTime = currentDate - startDate;
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return Math.floor(differenceInDays);
}

function coffeeConsumedSince1988() {
  const startDate = new Date("1988-01-01");
  const currentDate = new Date();
  const differenceInTime = currentDate - startDate;
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const averageCupsPerDay = 5;
  const totalCups = Math.floor(differenceInDays) * averageCupsPerDay;
  return totalCups;
}

const funfactData = [
  {
    id: 1,
    title: "Days as a developer",
    count: daysSince1988(),
    icon: "icon-like",
  },
  {
    id: 2,
    title: "Cups of coffee",
    count: coffeeConsumedSince1988(),
    icon: "icon-cup",
  },
  {
    id: 3,
    title: "Happy customers",
    count: 383,
    icon: "icon-emotsmile",
  },
  {
    id: 4,
    title: "Projects",
    count: 853,
    icon: "icon-trophy",
  },
];

function Funfacts() {
  return (
    <section className="shadow-dark color-white background parallax padding-50">
      <div className="row relative z-1 -mt-50">
        {funfactData.map((funfact) => (
          <div className="col-md-3 col-sm-6 mt-50" key={funfact.id}>
            <TrackVisibility once>
              <Funfact funfact={funfact} />
            </TrackVisibility>
          </div>
        ))}
      </div>
      <div className="overlay"></div>
    </section>
  );
}

export default Funfacts;
