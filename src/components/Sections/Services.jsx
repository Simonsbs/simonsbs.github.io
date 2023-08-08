import React from "react";
import Service from "../Items/Service";

const servicesData = [
  {
    id: 1,
    name: "Software Development",
    content:
      "Building tailor-made software solutions using cutting-edge technologies and methodologies.",
    icon: "bi-code",
  },
  {
    id: 2,
    name: "Project Management",
    content:
      "Leading projects from inception to completion, ensuring timely delivery and quality standards.",
    icon: "bi-kanban",
  },
  {
    id: 3,
    name: "Team Leadership",
    content:
      "Guiding and mentoring development teams to foster collaboration and achieve common goals.",
    icon: "bi-people",
  },
  {
    id: 4,
    name: "Strategic Planning",
    content:
      "Creating technology roadmaps and strategies aligned with business objectives and industry trends.",
    icon: "bi-bar-chart",
  },
  {
    id: 5,
    name: "Cloud Solutions",
    content:
      "Designing and implementing scalable cloud infrastructure to support modern applications.",
    icon: "bi-cloud",
  },
  {
    id: 6,
    name: "Security & Compliance",
    content:
      "Ensuring robust security measures and compliance with regulatory standards and best practices.",
    icon: "bi-shield-lock",
  },
  {
    id: 7,
    name: "Mobile Development",
    content:
      "Developing responsive and user-friendly mobile applications for various platforms.",
    icon: "bi-phone",
  },
  {
    id: 8,
    name: "Data Analytics",
    content:
      "Leveraging data to derive insights, make informed decisions, and drive business growth.",
    icon: "bi-graph-up",
  },
  {
    id: 9,
    name: "Machine Learning",
    content:
      "Implementing machine learning models to automate processes and enhance user experiences.",
    icon: "bi-lightbulb",
  },
  {
    id: 10,
    name: "UI/UX Design",
    content:
      "Creating intuitive and visually appealing user interfaces for optimal user experiences.",
    icon: "bi-palette",
  },
  {
    id: 11,
    name: "Technical Support",
    content:
      "Providing timely and effective support to ensure smooth operation and user satisfaction.",
    icon: "bi-headset",
  },
  {
    id: 12,
    name: "Consulting & Training",
    content:
      "Offering expert advice and training to enhance team skills and align with industry standards.",
    icon: "bi-briefcase",
  },
];

function Services() {
  return (
    <div className="row -mt-20">
      {servicesData.map((service) => (
        <div
          className="service-container col-md-4 col-sm-6 mt-20"
          key={service.id}
        >
          <Service service={service} />
        </div>
      ))}
    </div>
  );
}

export default Services;
