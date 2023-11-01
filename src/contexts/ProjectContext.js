import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const projectsData = [
    {
      id: 1,
      title: "Mad-AI-Libs",
      subtitle: "A Mad Libs game with a twist!",
      imageUrl: "./images/projects/mad-ai-libs.png",
      date: "2021-03-01",
      categories: ["React", "Game", "AI"],
      projectUrl: "https://mad-ai-libs.com/",
      description:
        "Mad-AI-Libs is a Mad Libs game with a twist! The game uses a neural network to generate the story based on the user's input.",
    },
    {
      id: 2,
      title: "C.R.U.D Connect",
      subtitle: "A generaic web rest app for C.R.U.D operations",
      imageUrl: "./images/projects/crudconnect.png",
      date: "2022-02-01",
      categories: ["API", "AWS", "NodeJS", "React"],
      projectUrl: "https://crudconnect.com",
      description:
        "A generaic web rest app for C.R.U.D operations using AWS, NodeJS, and React. The app is hosted on AWS and uses AWS Cognito for authentication.",
    },
    {
      id: 3,
      title: "Business Cards",
      subtitle: "A business card application",
      imageUrl: "./images/projects/cards.png",
      date: "2022-02-01",
      categories: ["React", "API", "AWS"],
      projectUrl: "https://bestdev.co.il/company-cards/",
      description:
        "A business card application using React and CrudConnect.com. The app is hosted on AWS and uses AWS Cognito for authentication.",
    },
  ];

  const [projects] = useState(
    projectsData.sort((a, b) => new Date(b.date) - new Date(a.date))
  );

  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
