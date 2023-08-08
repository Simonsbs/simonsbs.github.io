import React, { useState } from "react";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";

const contactData = {
  phone: ["+972545841058"],
  email: ["simonsbs@gmail.com"],
  location: "Hadera, Israel",
};

function Contact() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const isDevelopment = process.env.NODE_ENV === "development";

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isDevelopment && !recaptchaValue) {
      setError(true);
      setMessage("Please verify you are not a robot.");
      return;
    }
    if (!formdata.name) {
      setError(true);
      setMessage("Name is required");
    } else if (!formdata.email) {
      setError(true);
      setMessage("Email is required");
    } else if (!formdata.subject) {
      setError(true);
      setMessage("Subject is required");
    } else if (!formdata.message) {
      setError(true);
      setMessage("Message is required");
    } else {
      setError(false);
      emailjs
        .send(
          "service_lf0ynhs",
          "template_lpolee3",
          formdata,
          "us0gunYAFcwPMgsWj"
        )
        .then(
          (response) => {
            setError(false);
            setMessage("Your message has been sent!!!");
          },
          (err) => {
            setError(true);
            setMessage("Something went wrong. Please try again.");
          }
        );
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value); // Update reCAPTCHA value
  };

  const handleChange = (event) => {
    setFormdata({
      ...formdata,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleAlerts = () => {
    if (error && message) {
      return <div className="alert alert-danger mt-4">{message}</div>;
    } else if (!error && message) {
      return <div className="alert alert-success mt-4">{message}</div>;
    } else {
      return null;
    }
  };

  return (
    <div className="row">
      <div className="col-md-4 mb-4 mb-md-0">
        <div className="contact-info mb-5">
          <i className="icon-phone"></i>
          <div className="details">
            <h5>Phone</h5>
            {contactData.phone.map((singlePhone, index) => (
              <span key={index}>
                <a href={"tel:" + singlePhone}>{singlePhone}</a>
              </span>
            ))}
          </div>
        </div>
        <div className="contact-info mb-5">
          <i className="icon-envelope"></i>
          <div className="details">
            <h5>Email address</h5>
            {contactData.email.map((singleEmail, index) => (
              <span key={index}>
                <a href={"mailto:" + singleEmail}>{singleEmail}</a>
              </span>
            ))}
          </div>
        </div>
        <div className="contact-info">
          <i className="icon-location-pin"></i>
          <div className="details">
            <h5>Location</h5>
            <span>
              <a href="https://goo.gl/maps/gfC2nXNBBeEfcy57A">
                {contactData.location}
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <form className="contact-form" onSubmit={submitHandler}>
          <div className="row">
            <div className="column col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Your name"
                  onChange={handleChange}
                  value={formdata.name}
                />
              </div>
            </div>

            <div className="column col-md-6">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email address"
                  onChange={handleChange}
                  value={formdata.email}
                />
              </div>
            </div>

            <div className="column col-md-12">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  placeholder="Subject"
                  onChange={handleChange}
                  value={formdata.subject}
                />
              </div>
            </div>

            <div className="column col-md-12">
              <div className="form-group">
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  placeholder="Message"
                  onChange={handleChange}
                  value={formdata.message}
                ></textarea>
              </div>
            </div>
          </div>
          {!isDevelopment && (
            <ReCAPTCHA
              sitekey="6LeuFo4nAAAAAB2ILmBF5dmQMr2vgm6QAv4nqdiZ"
              onChange={handleRecaptchaChange}
            />
          )}
          <button
            type="submit"
            name="submit"
            value="Submit"
            className="btn btn-default"
          >
            <i className="icon-paper-plane"></i>Send Message
          </button>
        </form>
        {handleAlerts()}
      </div>
    </div>
  );
}

export default Contact;
