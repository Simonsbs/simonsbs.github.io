import { createContext, useContext, useState } from "react";

const CertificatesContext = createContext();

export const CertificatesProvider = ({ children }) => {
  const data = [
    {
      id: 1,
      title: "Google Project Management: Professional Certificate",
      FileUrl: "./certificates/coursera/Coursera TA6NTYVHP43P.pdf",
      date: "17-01-2024",
      skills: [],
      Url: "https://coursera.org/verify/professional-cert/TA6NTYVHP43P",
      description:
        "Creating risk management plans; Understanding process improvement techniques; Managing escalations, team dynamics, and stakeholders; Creating budgets and navigating procurement; Utilizing  project management software, tools, and templates; Practicing Agile project management, with an emphasis on Scrum.",
    },
    {
      id: 2,
      title: "University of Michigan - Digital Twins",
      FileUrl: "./certificates/coursera/Coursera XY3WVKHQZNK8.pdf",
      date: "17-12-2023",
      skills: [
        "Information technology infrastructure",
        "Business",
        "Digital Twins",
        "Manufacturing Process Management",
      ],
      Url: "https://coursera.org/verify/XY3WVKHQZNK8",
      description:
        "This course is part of the Digital Technologies and the Future of Manufacturing Specialization When you enroll in this course, you'll also be enrolled in this Specialization. Learn new concepts from industry experts Gain a foundational understanding of a subject or tool Develop job-relevant skills with hands-on projects Earn a shareable career certificate",
    },
    {
      id: 3,
      title: "Google Project Execution: Running the Project",
      FileUrl: "./certificates/coursera/Coursera JQYVQJCKD49J.pdf",
      date: "15-01-2024",
      skills: [
        "Project Management",
        "Risk Management",
        "Strategic Thinking",
        "Quality Management",
        "Project Execution",
      ],
      Url: "https://coursera.org/verify/JQYVQJCKD49J",
      description:
        "This course is part of the Google Project Management: Professional Certificate When you enroll in this course, you'll also be enrolled in this Professional Certificate. Learn new concepts from industry experts Gain a foundational understanding of a subject or tool Develop job-relevant skills with hands-on projects Earn a shareable career certificate from Google",
    },
    {
      id: 4,
      title: "Google Project Initiation: Starting a Successful Project",
      FileUrl: "./certificates/coursera/Coursera WTKQRTS4AEXR.pdf",
      date: "16-12-2023",
      skills: [
        "Project Management",
        "Strategic Thinking",
        "Business Writing",
        "Stakeholder Management",
        "Project Charter",
      ],
      Url: "https://coursera.org/verify/WTKQRTS4AEXR",
      description:
        "This course is part of the Google Project Management: Professional Certificate When you enroll in this course, you'll also be enrolled in this Professional Certificate. Learn new concepts from industry experts Gain a foundational understanding of a subject or tool Develop job-relevant skills with hands-on projects Earn a shareable career certificate from Google",
    },
  ];

  const [certificates] = useState(
    data.sort((a, b) => new Date(b.date) - new Date(a.date))
  );

  return (
    <CertificatesContext.Provider value={certificates}>
      {children}
    </CertificatesContext.Provider>
  );
};

export const useCertificates = () => {
  const context = useContext(CertificatesContext);
  if (!context) {
    throw new Error("useCertificate must be used within a CertificateProvider");
  }
  return context;
};
