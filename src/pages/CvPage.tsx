import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Braces, Printer } from "lucide-react";
import { NavLink } from "react-router-dom";
import PageFrame from "../components/PageFrame";

type SkillCategory = "Systems & Low-Level" | "Backend & Databases" | "Web & Design" | "Geo-Infrastructure";
type Skill = { name: string; category: SkillCategory; detail: string; level: string; tags: string[] };

const skillCategories = ["All", "Systems & Low-Level", "Backend & Databases", "Web & Design", "Geo-Infrastructure"] as const;
const skills: Skill[] = [
  { name: "C & C++", category: "Systems & Low-Level", detail: "Memory-aware systems programming, performance-critical logic, and the hardware and algorithmic foundations that make software efficient.", level: "CORE STUDY", tags: ["Memory", "Algorithms", "Performance"] },
  { name: "Java", category: "Systems & Low-Level", detail: "Object-oriented architecture, structured application design, and cross-platform tooling for maintainable programs.", level: "APPLICATIONS", tags: ["OOP", "Architecture", "Tooling"] },
  { name: "Python", category: "Backend & Databases", detail: "Scripting, data processing, automation, and geospatial or analytical workflows where repeatability matters.", level: "DATA / AUTOMATION", tags: ["Scripting", "Processing", "Automation"] },
  { name: "PHP & MySQL", category: "Backend & Databases", detail: "Server-side web logic, relational schema design, SQL querying, and dynamic data-driven web applications.", level: "WEB / DATA", tags: ["SQL", "Schema design", "CRUD"] },
  { name: "Web Design & Frontend", category: "Web & Design", detail: "Responsive UI architecture, modern CSS and Tailwind layouts, and interactive interfaces designed to work across screen sizes.", level: "INTERFACE", tags: ["HTML / CSS", "Responsive UI", "Interaction"] },
  { name: "Geo-Infrastructure", category: "Geo-Infrastructure", detail: "Spatial data handling, mapping infrastructure, and coordinate-driven systems that connect digital records to real places.", level: "FIELD / DATA", tags: ["Spatial data", "Mapping", "Coordinates"] },
];

export default function CvPage() {
  const [category, setCategory] = useState<(typeof skillCategories)[number]>("All");
  const [selectedSkill, setSelectedSkill] = useState<Skill>(skills[0]);
  const visibleSkills = skills.filter((skill) => category === "All" || skill.category === category);

  useEffect(() => {
    if (!visibleSkills.includes(selectedSkill)) setSelectedSkill(visibleSkills[0]);
  }, [category, selectedSkill, visibleSkills]);

  return (
    <PageFrame className="cv-page">
      <section className="page-hero wrap">
        <div className="page-hero-copy">
          <p className="eyebrow"><span>DOCUMENT 01</span> CURRICULUM VITAE</p>
          <h1>Learning the<br /><em>whole stack.</em></h1>
          <p>Technical secondary education, applied software practice and an ongoing interest in the systems that connect data, infrastructure and place.</p>
        </div>
        <div className="page-hero-index"><span>CV / 2026</span><strong>01—04</strong><span>TECHNICAL PRACTICE</span></div>
      </section>

      <section className="cv-timeline-section">
        <div className="wrap">
          <div className="section-title-row"><div><p className="eyebrow"><span>01</span> THE ROUTE SO FAR</p><h2>Education & <em>practice.</em></h2></div><button className="button button--outline print-button" type="button" onClick={() => window.print()}><Printer size={16} /> Print / Save CV</button></div>
          <div className="timeline">
            <article className="timeline-item">
              <div className="timeline-date">2024 — PRESENT</div><div className="timeline-marker"><i /></div>
              <div className="timeline-content"><span className="timeline-type">EDUCATION / SECONDARY</span><h3>Stredná priemyselná škola technická</h3><p className="timeline-place">Spišská Nová Ves, Slovakia</p><p>Technical secondary studies focused on engineering fundamentals, programming and applied technical systems. Coursework builds a foundation in structured problem solving and practical technology.</p><div className="timeline-tags"><span>Engineering fundamentals</span><span>Programming</span><span>Applied systems</span></div></div>
            </article>
            <article className="timeline-item">
              <div className="timeline-date">CONCURRENT WITH STUDIES</div><div className="timeline-marker"><i /></div>
              <div className="timeline-content"><span className="timeline-type">INDUSTRY / GEO-INFRASTRUCTURE</span><h3>Corageo</h3><p className="timeline-place">Practical technical work alongside secondary school</p><p>Work at the intersection of geospatial systems and software engineering: supporting spatial data workflows, geo-infrastructure and technical web or system tasks. This context makes data quality, coordinate reference and dependable interfaces tangible engineering concerns.</p><div className="timeline-tags"><span>Spatial workflows</span><span>Technical web support</span><span>Infrastructure</span></div></div>
            </article>
            <article className="timeline-item">
              <div className="timeline-date">2030 — PLANNED</div><div className="timeline-marker"><i /></div>
              <div className="timeline-content"><span className="timeline-type">ACADEMIC TRACK / PLANNED</span><h3>Technical University in Prešov</h3><p className="timeline-place">Planned higher technical and engineering specialization</p><p>A planned next step toward deeper technical study and engineering specialization after secondary education.</p><div className="timeline-tags"><span>Higher technical study</span><span>Engineering</span></div></div>
            </article>
          </div>
        </div>
      </section>

      <section className="skills-section">
        <div className="wrap">
          <div className="section-title-row"><div><p className="eyebrow"><span>02</span> TECHNICAL STACK</p><h2>Filter by <em>discipline.</em></h2></div><p className="section-side-note">Select a technology to see how it is used in practice.</p></div>
          <div className="skill-filters" role="group" aria-label="Filter technical skills">
            {skillCategories.map((item) => <button key={item} type="button" className={category === item ? "is-active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <div className="skill-explorer">
            <div className="skill-list" role="listbox" aria-label="Technologies">
              {visibleSkills.map((skill) => <button key={skill.name} type="button" role="option" aria-selected={selectedSkill.name === skill.name} className={selectedSkill.name === skill.name ? "is-selected" : ""} onClick={() => setSelectedSkill(skill)}><span>{skill.name}</span><small>{skill.category}</small><ArrowUpRight size={15} /></button>)}
            </div>
            <motion.article className="skill-detail" key={selectedSkill.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
              <div className="detail-topline"><span>TECHNOLOGY / 0{skills.indexOf(selectedSkill) + 1}</span><span>{selectedSkill.level}</span></div>
              <div className="skill-detail-icon"><Braces size={23} /></div>
              <p className="eyebrow">{selectedSkill.category}</p><h3>{selectedSkill.name}</h3><p>{selectedSkill.detail}</p>
              <div className="timeline-tags">{selectedSkill.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </motion.article>
          </div>
          <div className="print-skills">
            {skills.map((skill) => (
              <article key={skill.name}>
                <span>{skill.category}</span>
                <h3>{skill.name}</h3>
                <p>{skill.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="cv-foot-cta wrap"><div><span className="eyebrow">RELATED WORK</span><h2>See the ideas <em>in use.</em></h2></div><NavLink className="button button--primary" to="/projects">Explore projects <ArrowRight size={16} /></NavLink></section>
    </PageFrame>
  );
}

