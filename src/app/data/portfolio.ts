import projectData from "./projects.json";
import certificateData from "./certificates.json";
import articleData from "./articles.json";
import caseStudyData from "./case-studies.json";
import developmentData from "./professional-development.json";

export const profile = {
  name: "Simon B. Stirling",
  shortName: "Simon Stirling",
  email: "simonsbs@gmail.com",
  phone: "+972545841058",
  location: "Hadera, Israel",
  portrait:
    "https://www.gravatar.com/avatar/61a6abf1b8f426b8632138a2b8d3c564ad28e82dcf9fbc30a4654902033af9bb?s=1024&d=404",
  cv: "/media/Simon_Stirling_Solutions_Engineering_Architecture_CV.pdf",
  workRights: "UK citizen. No UK sponsorship required.",
  relocation: "Based in Israel. Planning UK relocation.",
  seeking:
    "Seeking full-time pre-sales, post-sales, enterprise architecture and solutions architect roles.",
  headline: "Pre-sales & Post-sales Solutions Architect",
  description:
    "Simon Stirling, solutions architect across pre-sales, enterprise solution design, implementation and post-sales support. 20+ years of experience. UK citizen with full UK working rights.",
  github: "https://github.com/Simonsbs/",
  linkedin: "https://www.linkedin.com/in/simon-stirling/",
};

export type Project = (typeof projectData)[number];
export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  category: string;
  type: string;
  date: string | null;
  skills: string[];
  url: string | null;
  file: string | null;
  order: number;
};
export type Article = (typeof articleData)[number];
export type CaseStudy = (typeof caseStudyData)[number];

export const projects = projectData.filter((project) => project.featured);
export const caseStudies = caseStudyData;
export const certificates: Certificate[] = [
  ...developmentData,
  ...certificateData.map((item): Certificate => ({
    id: `certificate-${item.id}`,
    title: item.id === 4 ? "G Suite Administrator Fundamentals" : item.title,
    issuer:
      item.id === 2 ? "University of Michigan / Coursera" : "Google / Coursera",
    category:
      item.id === 2
        ? "Technology"
        : item.id === 4
          ? "Workspace"
          : "Project management",
    type: item.id === 1 ? "Coursera specialisation" : "Course certificate",
    date: item.date,
    skills: item.skills,
    url: item.Url,
    file: item.FileUrl.replace("./", "/"),
    order: item.id === 1 ? 4 : 20 + item.id,
  })),
].sort((a, b) => a.order - b.order);
export const articles = [...articleData].sort(
  (a, b) => Date.parse(b.date) - Date.parse(a.date),
);

export const expertise = [
  {
    number: "01",
    icon: "architecture",
    title: "Pre-sales & solution consulting",
    description:
      "Lead customer discovery, explain architecture options and build demonstrations. Turn requirements into technical proposals, realistic estimates and a clear handover into delivery.",
    tags: ["Discovery & qualification", "Demos & PoCs", "Technical proposals"],
  },
  {
    number: "02",
    icon: "engineering",
    title: "Enterprise solution architecture",
    description:
      "Assess applications, data flows and integration dependencies. Translate business requirements into cloud and enterprise solution designs, with clear trade-offs, technical documentation and phased implementation plans.",
    tags: [
      "Application & integration design",
      "Cloud architecture",
      "Technical roadmaps",
    ],
  },
  {
    number: "03",
    icon: "leadership",
    title: "Post-sales & implementation",
    description:
      "Support customers through implementation, integration, onboarding and ongoing use. Investigate technical issues, coordinate fixes and controlled releases, and help teams keep production systems reliable.",
    tags: [
      "Implementation & integration",
      "Onboarding & support",
      "Technical troubleshooting",
    ],
  },
  {
    number: "04",
    icon: "mentoring",
    title: "Customer enablement & adoption",
    description:
      "Explain complex technical choices to business and engineering audiences. Deliver demonstrations, customer workshops and practical training, and guide teams through working prototypes and solution adoption.",
    tags: ["Customer workshops", "Technical training", "Developer mentoring"],
  },
] as const;

export const experience = [
  {
    period: "2005 to present",
    company: "Flame-Ware Solutions Ltd",
    role: "Lead solution architect",
    background: "Additional roles: CTO and co-owner.",
    description:
      "Work directly with enterprise customers from discovery and technical evaluation through proposals, architecture, implementation and production support. Develop demonstrations and integration designs, coordinate delivery teams and resolve technical issues after deployment.",
  },
  {
    period: "2017 to present",
    company: "Brama Technological Lab",
    role: "Lead IT architect, head of R&D, sales & support",
    description:
      "Combine infrastructure and secure-systems architecture with R&D, customer assessment, supplier evaluation, technical sales and support. Deliver prototypes, product evaluations and tailored technology solutions.",
  },
  {
    period: "2010 to present",
    company: "Educational institutes, HackerU & independent teaching",
    role: "Technology lecturer & technical trainer",
    description:
      "Teach developers, students and enterprise teams across software development, databases, cloud, APIs and architecture. Develop curricula, practical exercises and technical training materials, and mentor learners through implementation.",
  },
  {
    period: "2004 to 2005",
    company: "CoolVision",
    role: "Head of R&D / development team",
    description:
      "Leading developers and database specialists on a global social networking platform with live video broadcasting.",
  },
  {
    period: "2000 to 2004",
    company: "Public-sector medical-services technology branch",
    role: "Head of development & systems analysis",
    description:
      "Led analysis, development and support of secure client/server and intranet systems for HR, personnel management and internal operations, alongside user training and support.",
  },
];

export const technologyGroups = [
  {
    title: "Software & integration",
    items: [
      "C# / .NET",
      "Python",
      "TypeScript",
      "SQL Server",
      "REST APIs",
      "OAuth 2.0",
      "Webhooks",
    ],
  },
  {
    title: "Cloud & delivery",
    items: [
      "Azure",
      "AWS",
      "GCP",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Terraform",
      "Azure DevOps",
    ],
  },
  {
    title: "Applied AI & data",
    items: [
      "LLM integration",
      "RAG prototypes",
      "LangChain",
      "ChromaDB",
      "Ollama",
      "MCP prototypes",
      "Data integration",
      "Power BI",
    ],
  },
];

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));

export const articlePath = (article: Article) =>
  `/blog/${article.id}/${article.slug}`;
