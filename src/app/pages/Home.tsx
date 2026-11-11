import { useEffect } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Download,
  GraduationCap,
  Layers3,
  MapPin,
  Users,
} from "lucide-react";
import { Github, Linkedin } from "../components/BrandIcons";
import { Link, useLocation } from "react-router-dom";
import {
  articles,
  caseStudies,
  certificates,
  experience,
  expertise,
  profile,
  technologyGroups,
} from "../data/portfolio";
import {
  ArticleCard,
  Eyebrow,
  PageMeta,
  SectionHeading,
} from "../components/UI";
import SystemMap from "../components/SystemMap";
import Contact from "../components/Contact";
import CaseStudyCard from "../components/CaseStudyCard";
import StandaloneProjects from "../components/StandaloneProjects";

const expertiseIcons = {
  architecture: Layers3,
  engineering: Code2,
  leadership: Users,
  mentoring: GraduationCap,
};
const anchorIds: Record<string, string> = {
  "/about": "about",
  "/services": "expertise",
  "/resume": "experience",
  "/contact": "contact",
  "/blogpreview": "journal",
  "/work": "work",
};

export default function Home() {
  const { pathname, key } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = anchorIds[pathname];
      if (target)
        document.getElementById(target)?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, key]);

  return (
    <>
      <PageMeta title={profile.headline} description={profile.description} />
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <Eyebrow>Enterprise · Pre-sales & post-sales</Eyebrow>
          <h1 id="hero-title">
            Solutions
            <br />
            <span>architect.</span>
          </h1>
          <p className="hero-description">
            I turn enterprise requirements into solutions customers can
            evaluate, implement and support. My work includes cloud
            modernisation, production document AI and enterprise integration.
          </p>
          <div className="hero-actions">
            <Link to="/work" className="button button-primary">
              View selected work
              <ArrowDownRight size={20} />
            </Link>
            <a href={profile.cv} download className="button button-secondary">
              Download CV
              <Download size={17} />
            </a>
            <Link to="/contact" className="button button-text">
              Discuss a role
              <ArrowUpRight size={19} />
            </Link>
          </div>
          <div className="hero-footnote">
            <span>
              <MapPin size={14} />
              {profile.location}
            </span>
            <span className="small-divider" />
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <Github size={16} />
            </a>
          </div>
          <div className="hero-career-note">
            <strong>{profile.workRights}</strong>
            <span>{profile.relocation}</span>
          </div>
        </div>
        <SystemMap />
        <div className="hero-bottom">
          <span>{profile.seeking}</span>
          <Link to="/services">
            Explore my expertise
            <ArrowDown size={16} />
          </Link>
        </div>
      </section>

      <div className="experience-strip">
        <div className="shell experience-strip-inner">
          <div className="experience-stat">
            <strong>
              20<span>+</span>
            </strong>
            <span>
              Years in enterprise systems,
              <br />
              architecture & delivery
            </span>
          </div>
          <div className="experience-pillar">
            <Layers3 size={24} />
            <span>
              Production document AI.
              <br />
              <strong>.NET, APIs & LLM integration.</strong>
            </span>
          </div>
          <div className="experience-pillar">
            <Code2 size={24} />
            <span>
              Cloud & manufacturing data.
              <br />
              <strong>Architecture into production.</strong>
            </span>
          </div>
          <div className="experience-pillar">
            <Users size={24} />
            <span>
              Customer delivery.
              <br />
              <strong>Discovery through support.</strong>
            </span>
          </div>
        </div>
      </div>

      <section id="work" className="section work-section">
        <div className="shell">
          <SectionHeading
            number="01"
            eyebrow="CUSTOMER SOLUTIONS IN PRACTICE"
            title={
              <>
                Enterprise problems.
                <br />
                Customer delivery.
              </>
            }
            link={{ to: "/projects", label: "Explore projects & case studies" }}
          >
            Examples from my work in architecture and delivery. Customer details
            are anonymised; each example states its delivery stage.
          </SectionHeading>
          <div className="case-studies-grid">
            {caseStudies.slice(0, 3).map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
          <StandaloneProjects featured />
          <a
            className="github-note"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={19} />
            <span>
              Public code and technical experiments.{" "}
              <strong>Explore my GitHub.</strong>
            </span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section id="expertise" className="section shell">
        <SectionHeading
          number="02"
          eyebrow="WHAT I BRING"
          title={
            <>
              Pre-sales, architecture
              <br />
              and post-sales.
            </>
          }
        >
          How I support customers and delivery teams.
        </SectionHeading>
        <div className="expertise-grid">
          {expertise.map((item) => {
            const Icon = expertiseIcons[item.icon];
            return (
              <article className="expertise-item" key={item.title}>
                <div className="expertise-top">
                  <Icon size={27} strokeWidth={1.4} />
                  <span>{item.number}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="expertise-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="about" className="section shell about-section">
        <div className="about-portrait">
          <img
            src={profile.portrait}
            alt="Simon Stirling, pre-sales and post-sales solutions architect"
            width="460"
            height="460"
            loading="lazy"
          />
          <div className="portrait-caption">
            <span>SIMON B. STIRLING</span>
            <span>
              Solutions architecture.
              <ArrowUpRight size={17} />
            </span>
          </div>
          <div className="portrait-corner" aria-hidden="true">
            +
          </div>
        </div>
        <div className="about-copy">
          <div className="section-kicker">
            <span>03</span>THE PERSON BEHIND THE WORK
          </div>
          <h2>
            Technical depth.
            <br />
            <span>Customer focus.</span>
          </h2>
          <p className="about-lead">
            I work with business stakeholders and engineering teams, from the
            first technical assessment through production delivery and support.
          </p>
          <p>
            Alongside architecture and hands-on development, I deliver customer
            workshops and practical training for technical and business
            audiences.
          </p>
          <p className="education-note">
            BSc Computer Science, University of the People. UK citizen with full
            UK working rights.
          </p>
          <div className="about-actions">
            <a href={profile.cv} download className="button button-secondary">
              Download my CV
              <Download size={17} />
            </a>
            <Link to="/certificates" className="text-link">
              Courses & certificates
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section id="experience" className="section shell experience-section">
        <div className="experience-intro">
          <div className="section-kicker">
            <span>04</span>THE JOURNEY SO FAR
          </div>
          <h2>
            From proposal
            <br />
            to delivery
            <br />
            <span>& support.</span>
          </h2>
          <a href={profile.cv} className="text-link" download>
            The full story, in my CV
            <ArrowDown size={17} />
          </a>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={item.company}>
              <div className="timeline-dot" />
              <span className="timeline-period">{item.period}</span>
              <h3>{item.role}</h3>
              <span className="timeline-company">{item.company}</span>
              <p>{item.description}</p>
              {item.background && (
                <span className="timeline-background">{item.background}</span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="toolbox-section">
        <div className="shell toolbox-inner">
          <div>
            <div className="section-kicker">A PRACTICAL TOOLBOX</div>
            <h2>
              Architecture backed
              <br />
              by implementation.
            </h2>
            <p>
              Tools used across solution design, hands-on implementation and
              prototype evaluation.
            </p>
          </div>
          <div className="toolbox-groups">
            {technologyGroups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <div className="tags">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="journal" className="section shell">
        <SectionHeading
          number="05"
          eyebrow="NOTES & PERSPECTIVES"
          title={
            <>
              Solution design.
              <br />
              Practical delivery.
            </>
          }
          link={{ to: "/blog/", label: "Visit the journal" }}
        >
          Recent engineering notes from the public projects, with implementation
          details and evidence you can inspect.
        </SectionHeading>
        <div className="articles-grid">
          {articles
            .filter((article) => [32, 33, 34].includes(article.id))
            .map((article) => (
              <ArticleCard key={article.id} article={article} compact />
            ))}
        </div>
        <div className="learning-note">
          <GraduationCap size={23} />
          <span>Professional development in AI, cloud and delivery.</span>
          <Link to="/certificates">
            Explore {certificates.length} courses & certificates
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="shell">
          <Contact />
        </div>
      </section>
    </>
  );
}
