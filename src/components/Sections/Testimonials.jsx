import React from "react";
import Slider from "react-slick";
import Testimonial from "../Items/Testimonial";

const testimonialsData = [
  {
    id: 1,
    content:
      "I enjoy working with the theme and learn so much. You guys make the process fun and interesting. Good luck!",
    authorImage: "images/customer-1.png",
    authorName: "Helen Doe",
    authorStatus: "Themeforest customer",
  },
  {
    id: 2,
    content:
      "I enjoy working with the theme and learn so much. You guys make the process fun and interesting. Good luck!",
    authorImage: "images/customer-2.png",
    authorName: "Jane Doe",
    authorStatus: "Themeforest customer",
  },
  {
    id: 3,
    content:
      "I enjoy working with the theme and learn so much. You guys make the process fun and interesting. Good luck!",
    authorImage: "images/customer-2.png",
    authorName: "Jane Doe",
    authorStatus: "Themeforest customer",
  },
];

function Testimonials() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="testimonials-wrapper">
      <Slider {...settings} className="padding-slider">
        {testimonialsData.map((testimonial) => (
          <Testimonial testimonial={testimonial} key={testimonial.id} />
        ))}
      </Slider>
    </div>
  );
}

export default Testimonials;
