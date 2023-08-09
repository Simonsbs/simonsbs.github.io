import React, { useEffect } from "react";
import { Element } from "react-scroll";
import Layout from "../components/Layout/Layout";
import About from "../components/Sections/About";
import Herosection from "../components/Sections/Herosection";
import SectionHeading from "../components/Items/SectionHeading";
import Skills from "../components/Sections/Skills";
import Funfacts from "../components/Sections/Funfacts";
import Services from "../components/Sections/Services";
import Experiences from "../components/Sections/Experiences";
import Blogs from "../components/Sections/Blogs";
import Contact from "../components/Sections/Contact";

const programmingLanguages = [
  "C",
  "C++",
  "Java",
  "Python",
  "Ruby",
  "Go",
  "R",
  "Objective-C",
  "PHP",
  "SQL",
  "C#",
  "TypeScript",
  "Swift",
  "Kotlin",
  "Rust",
];
const frameworks = [
  "Angular",
  "Vue.js",
  "Spring",
  "Django",
  "Ruby on Rails",
  "Express.js",
  "ASP.NET",
  "Laravel",
  "Symfony",
  "Flutter",
  "Xamarin",
  "TensorFlow",
  "PyTorch",
  "Unity",
];
const libraries = [
  "React",
  "jQuery",
  "Lodash",
  "Underscore.js",
  "Moment.js",
  "D3.js",
  "Three.js",
  "Redux",
  "MobX",
  "RxJS",
  "NumPy",
  "Pandas",
  "Scikit-learn",
  "OpenCV",
  "OpenGL",
  "Bootstrap",
];

function Homepage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <Element name="section-home">
        <Herosection />
      </Element>

      <Element name="section-about">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="About Me" />
          <About />
        </section>
      </Element>

      <Element name="section-programming-languages">
        <section className="shadow-blue white-bg padding">
          <Skills
            title="A Few Programming Languages"
            skills={programmingLanguages}
          >
            In the ever-evolving realm of technology, mastering a diverse set of
            programming languages is paramount. My proficiency spans across a
            broad spectrum of languages, each chosen for its unique capabilities
            and relevance in modern software development. From foundational
            languages that have stood the test of time to the latest in
            cutting-edge development, here are the programming languages I'm
            well-versed in:
          </Skills>
        </section>
      </Element>

      <Element name="section-libraries">
        <section className="shadow-blue white-bg padding">
          <Skills title="A Few Libraries" skills={libraries}>
            In the intricate world of software development, libraries play a
            crucial role in accelerating the development process and enhancing
            functionality. Leveraging the right libraries can transform complex
            tasks into manageable ones, providing robust solutions without
            reinventing the wheel. Here are some of the essential libraries I've
            utilized to build efficient, scalable, and innovative applications:
          </Skills>
        </section>
      </Element>

      <Element name="section-frameworks">
        <section className="shadow-blue white-bg padding">
          <Skills title="A Few Frameworks" skills={frameworks}>
            Frameworks are the backbone of efficient and scalable software
            development. They provide a structured foundation, enabling rapid
            development without compromising quality or flexibility. My
            experience with various frameworks has allowed me to craft solutions
            that are both robust and adaptable, tailored to the specific needs
            and goals of each project. Here are some of the key frameworks I've
            mastered, each contributing to streamlined development and
            successful project outcomes:
          </Skills>
        </section>
      </Element>

      <Element name="section-funfacts">
        <Funfacts />
      </Element>

      <Element name="section-services">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Services" />
          <Services />
        </section>
      </Element>

      <Element name="section-experiences">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Experience" />
          <Experiences />
        </section>
      </Element>

      {/* <Element name="section-portfolios">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Portfolio" />
          <Portfolios />
        </section>
      </Element>

      <Element name="section-pricing">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Pricing table" />
          <PricingTable />
        </section>
      </Element>

      <Element name="section-testimonials">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Testimonials" />
          <Testimonials />
        </section>
      </Element>

      <Element name="section-clients">
        <Clients />
      </Element> */}

      <Element name="section-blogs">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Recent posts" />
          <Blogs />
        </section>
      </Element>

      <Element name="section-contact">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Get in touch" />
          <Contact />
        </section>
      </Element>
    </Layout>
  );
}

export default Homepage;
