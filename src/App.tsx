import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Compass,
  Layers3,
  Map,
  Menu,
  Network,
  Printer,
  X,
} from "lucide-react";
import {
  HashRouter,
  NavLink,
  Route as RouterRoute,
  Routes,
  useLocation,
} from "react-router-dom";

const navigation = [
  { to: "/", label: "Home", end: true },
  { to: "/cv", label: "Curriculum vitae" },
  { to: "/projects", label: "Projects" },
  { to: "/expeditions", label: "Expeditions" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <NavLink className="brand" to="/" aria-label="J. F. home">
          <span className="brand-mark">JF<span> / </span>01</span>
          <span className="brand-name">J. F. <small>FIELD / CODE</small></span>
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav
          className={`main-nav${menuOpen ? " main-nav--open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {navigation.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
            >
              {label}
            </NavLink>
          ))}
          <span className="nav-location"><i /> Slovakia / Europe</span>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const [contactStatus, setContactStatus] = useState("");

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setContactStatus("Your email app should open with a draft. Add the recipient and send when ready.");
  }

  return (
    <footer className="site-footer">
      <section className="footer-contact wrap">
        <div className="footer-contact-copy">
          <p className="eyebrow"><span>OPEN CHANNEL</span> CONTACT</p>
          <h2>Start with a<br /><em>clear question.</em></h2>
          <p>For project conversations, technical questions or a note about spatial systems, prepare a message here.</p>
        </div>
        <form className="footer-contact-form" onSubmit={prepareEmail}>
          <div className="contact-fields">
            <label>Name<input name="name" autoComplete="name" minLength={2} required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          </div>
          <label>Message<textarea name="message" rows={3} minLength={10} required /></label>
          <div className="contact-submit-row">
            <span className="contact-status" role="status">{contactStatus}</span>
            <button className="button button--primary" type="submit">Prepare email <ArrowUpRight size={15} /></button>
          </div>
        </form>
      </section>
      <div className="wrap footer-main">
        <div>
          <span className="eyebrow">JACOFAC / FIELD NOTES</span>
          <p>Software, spatial systems<br />and the places around them.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {navigation.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}>{label}</NavLink>
          ))}
        </nav>
        <div className="footer-coordinate"><Compass size={17} /> 48°56′ N / 20°34′ E</div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} J. F. / BUILT IN SLOVAKIA</span>
        <span>FIELD NOTES · TECHNICAL PRACTICE</span>
        <NavLink to="/cv">CV <ArrowUpRight size={13} /></NavLink>
      </div>
    </footer>
  );
}

function PageFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <>
      <Header />
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
}

function IntroSequence({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onFinish, 2550);
    return () => window.clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="intro-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
      aria-label="Site initialization"
    >
      <div className="intro-grid" />
      <div className="intro-content">
        <div className="intro-mark">JF<span> / </span>01</div>
        <div className="intro-console">
          <p><span>SYS</span> establishing field connection <b>OK</b></p>
          <p><span>GEO</span> 48.9445° N / 20.5615° E <b>LOCKED</b></p>
          <p><span>DEV</span> loading technical portfolio <b>READY</b></p>
        </div>
        <div className="intro-progress"><span /></div>
        <div className="intro-bottom"><span>SPIŠSKÁ NOVÁ VES · SLOVAKIA</span><button type="button" onClick={onFinish}>Skip intro <ArrowRight size={14} /></button></div>
      </div>
    </motion.div>
  );
}

const overviewCards = [
  { index: "01", title: "Curriculum vitae", detail: "Study, practice & technical stack", to: "/cv", icon: Braces },
  { index: "02", title: "Projects", detail: "Systems, data & spatial tooling", to: "/projects", icon: Layers3 },
  { index: "03", title: "Expeditions", detail: "Ancient Indonesia, read through place", to: "/expeditions", icon: Map },
];

const focusItems = [
  { label: "Systems", detail: "C / C++ / Java", value: "01" },
  { label: "Data", detail: "SQL / schema design", value: "02" },
  { label: "Web", detail: "Interfaces / application logic", value: "03" },
  { label: "Field", detail: "Geo-infrastructure / Corageo", value: "04" },
];

function HomePage() {
  const [introVisible, setIntroVisible] = useState(() => (
    (window.location.hash === "" || window.location.hash === "#/") && !sessionStorage.getItem("portfolio-intro-seen")
  ));
  const [focusIndex, setFocusIndex] = useState(0);

  const finishIntro = useCallback(() => {
    sessionStorage.setItem("portfolio-intro-seen", "true");
    setIntroVisible(false);
  }, []);

  return (
    <>
      <PageFrame>
        <section className="home-hero wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> TECHNICAL STUDENT / SOFTWARE DEVELOPER</p>
            <h1>Building systems<br />that <em>make sense</em><br />in the real world.</h1>
            <p className="hero-lede">I’m a technical student and software developer in Slovakia, working across systems programming, relational data, web interfaces and geospatial infrastructure.</p>
            <div className="hero-meta"><span><Map size={14} /> Spišská Nová Ves, Slovakia</span><span>48°56′ N / 20°34′ E</span></div>
            <div className="hero-actions">
              <NavLink className="button button--primary" to="/projects">Explore engineering work <ArrowDownRight size={16} /></NavLink>
              <NavLink className="text-link" to="/cv">View the CV <ArrowRight size={15} /></NavLink>
            </div>
          </div>
          <div className="hero-graphic" aria-label="Schematic map with a connected coordinate grid" role="img">
            <div className="graphic-top"><span>FIELD / 48.9445° N</span><span>MAP REF. 001</span></div>
            <svg className="contour-map" viewBox="0 0 640 520" aria-hidden="true">
              <path d="M35 162c70-82 155-57 218-98s151-30 202 20 105 53 150 35" />
              <path d="M13 203c70-82 155-57 218-98s151-30 202 20 105 53 150 35" />
              <path d="M-9 244c70-82 155-57 218-98s151-30 202 20 105 53 150 35" />
              <path d="M-20 305c92-35 142-78 222-62s149 57 222 16 111-25 168 5" />
              <path d="M-5 349c92-35 142-78 222-62s149 57 222 16 111-25 168 5" />
              <path d="M18 399c92-35 142-78 222-62s149 57 222 16 111-25 168 5" />
              <path d="M174 5c33 78 13 132 49 185s18 107 52 159 56 94 46 165" />
              <path d="M245 5c33 78 13 132 49 185s18 107 52 159 56 94 46 165" />
              <path d="M317 5c33 78 13 132 49 185s18 107 52 159 56 94 46 165" />
            </svg>
            <div className="graphic-crosshair"><span /><i /></div>
            <div className="graphic-coordinate"><span>SVK / 01</span><strong>48.9445° N</strong><strong>20.5615° E</strong></div>
            <span className="graphic-caption">TERRAIN / DATA / CONNECTION</span>
          </div>
          <span className="hero-index">PORTFOLIO — 2026 / 01</span>
        </section>

        <section className="overview-section">
          <div className="wrap">
            <div className="section-intro">
              <div><p className="eyebrow"><span>01</span> START HERE</p><h2>Three ways into<br /><em>the work.</em></h2></div>
              <p>Technical learning is most useful when it meets a real problem. Choose a route to see how I approach it.</p>
            </div>
            <div className="overview-grid">
              {overviewCards.map(({ index, title, detail, to, icon: Icon }) => (
                <NavLink className="overview-card" to={to} key={to}>
                  <span className="card-index">{index} / 03</span>
                  <span className="overview-icon"><Icon size={22} strokeWidth={1.6} /></span>
                  <span className="overview-card-copy"><strong>{title}</strong><small>{detail}</small></span>
                  <ArrowUpRight className="card-arrow" size={18} />
                </NavLink>
              ))}
            </div>
          </div>
        </section>

        <section className="focus-section">
          <div className="wrap focus-layout">
            <div className="focus-heading">
              <p className="eyebrow"><span>02</span> AT A GLANCE</p>
              <h2>From the low<br />level to the <em>landscape.</em></h2>
              <p>A broad technical education, connected to practical geo-infrastructure work at Corageo.</p>
            </div>
            <div className="focus-console">
              <div className="console-header"><span><i /> FOCUS MATRIX</span><span>SELECT A DOMAIN</span></div>
              <div className="focus-options" role="tablist" aria-label="Technical focus areas">
                {focusItems.map((item, index) => (
                  <button
                    className={focusIndex === index ? "is-selected" : ""}
                    key={item.value}
                    type="button"
                    role="tab"
                    aria-selected={focusIndex === index}
                    onClick={() => setFocusIndex(index)}
                  >
                    <span>{item.value}</span><strong>{item.label}</strong><ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
              <div className="focus-result" role="tabpanel">
                <span>ACTIVE DOMAIN / {focusItems[focusIndex].value}</span>
                <strong>{focusItems[focusIndex].detail}</strong>
                <p>{[
                  "Building confidence with compiled languages, explicit data structures and algorithmic foundations.",
                  "Designing tables and queries that keep structured information consistent and useful.",
                  "Connecting clear responsive interfaces with the logic and data behind them.",
                  "Applying technical web and data skills to spatial workflows and infrastructure support.",
                ][focusIndex]}</p>
              </div>
              <div className="console-foot"><span>FOCUS AREAS 04</span><span>LIVE / INTERACTIVE</span></div>
            </div>
          </div>
        </section>
        <section className="bio-section">
          <div className="wrap bio-grid">
            <div><p className="eyebrow"><span>03</span> ABOUT / PRACTICE</p><h2>Technical by training.<br /><em>Grounded in place.</em></h2></div>
            <div className="bio-copy">
              <p>I’m studying technical systems in Spišská Nová Ves while building practical experience in software and geospatial infrastructure. At Corageo, spatial data and technical web support connect classroom ideas to real operational workflows.</p>
              <p>The through-line is dependable structure: programs that handle data carefully, interfaces that make it easier to inspect, and geographic context that keeps the system connected to the world it represents.</p>
              <NavLink className="text-link" to="/cv">Education and experience <ArrowRight size={15} /></NavLink>
            </div>
          </div>
        </section>
        <section className="home-outro wrap">
          <span className="eyebrow">NEXT FIELD NOTE</span>
          <NavLink to="/expeditions">Read the landscape <ArrowRight size={17} /></NavLink>
          <p>Ancient Indonesian architecture, geography and the engineering choices that tie them together.</p>
        </section>
      </PageFrame>
      <AnimatePresence>{introVisible && <IntroSequence onFinish={finishIntro} />}</AnimatePresence>
    </>
  );
}

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

function CvPage() {
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

type ProjectCategory = "Geo-Infrastructure" | "Systems & Backend" | "Web & Database";
type Project = {
  number: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  problem: string;
  architecture: string;
  implementation: string;
  diagram: string[];
  mark: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Spatial Infrastructure & Mapping Portal", // [Project Name - Edit Me]
    category: "Geo-Infrastructure",
    summary: "A practical portal concept for browsing infrastructure records with their geographic context.",
    problem: "Infrastructure records are hard to use when asset details and their location live in separate tools. Operators need a consistent view of what exists, where it is, and how its record is maintained.",
    architecture: "PHP application layer serves map and record views; MySQL stores normalized asset, location and category data; JavaScript coordinates map interactions and filters.",
    implementation: "A shared asset identifier links relational records to coordinate pairs. Server-side validation protects edits; indexed category and location fields make filtering predictable as records grow.",
    diagram: ["PHP UI", "Spatial API", "MySQL + coordinates"],
    mark: "GEO / 001",
  },
  {
    number: "02",
    title: "Concurrent Data Processing Engine", // [Project Name - Edit Me]
    category: "Systems & Backend",
    summary: "A systems study in partitioning input, processing work concurrently and collecting consistent results.",
    problem: "Large input sets can make single-threaded processing slow and unresponsive. The design needs to divide independent work without losing ordering, correctness or clear failure reporting.",
    architecture: "A C++ processing core uses a bounded worker pool and task queue, with a Java-facing model for structured configuration and result inspection.",
    implementation: "Input is divided into deterministic chunks. Workers return typed results to a synchronized collector; the coordinator reports progress and consolidates output only after completion.",
    diagram: ["Input queue", "Worker pool", "Ordered results"],
    mark: "SYS / 002",
  },
  {
    number: "03",
    title: "Spatial Data Automation Pipeline", // [Project Name - Edit Me]
    category: "Geo-Infrastructure",
    summary: "A repeatable Python workflow to check, transform and summarize spatial datasets.",
    problem: "Manual spatial data preparation is easy to repeat inconsistently. Coordinate assumptions, missing fields and malformed records should be detected before downstream use.",
    architecture: "Python stages handle source inspection, validation, transformation and report output; each stage passes a clear data contract to the next.",
    implementation: "The pipeline checks required attributes, records invalid geometries and produces a concise run summary. Explicit coordinate-system metadata prevents silent assumptions during transformation.",
    diagram: ["Inspect source", "Validate / transform", "Export + report"],
    mark: "DATA / 003",
  },
  {
    number: "04",
    title: "Relational Service & Web Platform", // [Project Name - Edit Me]
    category: "Web & Database",
    summary: "A full-stack platform model for structured records, predictable queries and a responsive front end.",
    problem: "A growing dataset becomes fragile when related information is duplicated or updated through disconnected pages. Users need clear forms and trustworthy records.",
    architecture: "A responsive frontend submits to PHP endpoints; MySQL constraints and relational tables preserve data integrity; SQL queries support filtered list and detail views.",
    implementation: "The schema separates entities into linked tables with primary and foreign keys. Form validation happens at the interface and server boundary, with explicit feedback for failed operations.",
    diagram: ["Responsive UI", "PHP endpoints", "Relational schema"],
    mark: "WEB / 004",
  },
];

const projectFilters = ["All Projects", "Geo-Infrastructure", "Systems & Backend", "Web & Database"] as const;
type ProjectFilter = (typeof projectFilters)[number];

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const [selectedLayer, setSelectedLayer] = useState(0);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.article className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.25 }}>
        <div className="case-modal-head"><span>{project.mark} / CASE STUDY</span><button type="button" aria-label="Close case study" onClick={onClose}><X size={20} /></button></div>
        <p className="eyebrow">{project.category}</p><h2 id="case-title">{project.title}</h2><p className="case-summary">{project.summary}</p>
        <div className="case-content">
          <section><span className="eyebrow">01 / PROBLEM SOLVED</span><p>{project.problem}</p></section>
          <section><span className="eyebrow">02 / ARCHITECTURE & STACK</span><p>{project.architecture}</p></section>
          <section><span className="eyebrow">03 / KEY IMPLEMENTATION</span><p>{project.implementation}</p></section>
        </div>
        <div className="case-diagram">
          <div className="diagram-label"><Network size={15} /> INTERACTIVE ARCHITECTURE / SELECT A LAYER</div>
          <div className="diagram-flow">
            {project.diagram.map((part, index) => (
              <button
                className={`diagram-node${selectedLayer === index ? " is-selected" : ""}`}
                key={part}
                type="button"
                aria-pressed={selectedLayer === index}
                onClick={() => setSelectedLayer(index)}
              >
                <span>0{index + 1}</span><strong>{part}</strong>
                {index < project.diagram.length - 1 && <ArrowRight size={16} />}
              </button>
            ))}
          </div>
          <div className="mock-data">
            <span>MOCK DATA / {project.mark} / LAYER 0{selectedLayer + 1}</span>
            <code>{`{ "component": "${project.diagram[selectedLayer]}", "status": "validated" }`}</code>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectFilter>("All Projects");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const visibleProjects = projects.filter((project) => filter === "All Projects" || project.category === filter);

  return (
    <PageFrame className="projects-page">
      <section className="page-hero wrap">
        <div className="page-hero-copy"><p className="eyebrow"><span>DOCUMENT 02</span> PROJECTS / ENGINEERING</p><h1>Systems made<br />for <em>real context.</em></h1><p>Four engineering studies across mapping, data processing, application architecture and relational web systems. Open a case to inspect the design decisions.</p></div>
        <div className="page-hero-index"><span>PORTFOLIO</span><strong>04 CASES</strong><span>TECHNICAL STUDIES</span></div>
      </section>
      <section className="project-showcase">
        <div className="wrap">
          <div className="project-toolbar"><span className="eyebrow">SELECTED ENGINEERING / {String(visibleProjects.length).padStart(2, "0")}</span><div className="project-filters" role="group" aria-label="Filter projects">{projectFilters.map((item) => <button type="button" key={item} aria-pressed={filter === item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
          <div className="engineering-grid">
            {visibleProjects.map((project) => (
              <motion.article className="engineering-card" key={project.number} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <button className="engineering-open" type="button" onClick={() => setActiveProject(project)} aria-label={`Open case study: ${project.title}`}>
                  <div className={`project-visual project-visual--${project.number}`}>
                    <span className="visual-topline">{project.mark}<span>SCHEMATIC / NOT TO SCALE</span></span>
                    <div className="visual-lines"><i /><i /><i /><i /><b /></div>
                    <div className="visual-stamp">{project.number}<ArrowUpRight size={16} /></div>
                    <span className="visual-caption">{project.diagram.join(" → ")}</span>
                  </div>
                  <div className="engineering-info"><div><span className="project-type">{project.category}</span><h2>{project.title}</h2><p>{project.summary}</p></div><span className="open-case">OPEN CASE <ArrowUpRight size={15} /></span></div>
                  <div className="engineering-specs">
                    <div><span>PROBLEM SOLVED</span><p>{project.problem}</p></div>
                    <div><span>ARCHITECTURE & STACK</span><p>{project.architecture}</p></div>
                    <div><span>KEY IMPLEMENTATION</span><p>{project.implementation}</p></div>
                  </div>
                </button>
              </motion.article>
            ))}
          </div>
          <div className="project-disclaimer"><span className="status-dot" /> CONCEPTUAL CASE STUDIES / TECHNICAL APPROACHES, NOT CLAIMS OF DEPLOYED PRODUCTS.</div>
        </div>
      </section>
      <section className="project-process wrap"><div><p className="eyebrow"><span>01</span> METHOD</p><h2>Trace the problem<br />to <em>the data.</em></h2></div><div className="process-steps"><div><span>01</span><strong>Locate the need</strong><p>Define who needs the system and what decision it should support.</p></div><div><span>02</span><strong>Model the information</strong><p>Choose the structures, relationships and validation rules before the interface.</p></div><div><span>03</span><strong>Make it inspectable</strong><p>Expose useful state, clear errors and behavior that can be tested.</p></div></div></section>
      <AnimatePresence>{activeProject && <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />}</AnimatePresence>
    </PageFrame>
  );
}

type Waypoint = { id: string; name: string; region: string; coordinates: string; period: string; architecture: string; context: string; left: string; top: string };
const waypoints: Waypoint[] = [
  { id: "borobudur", name: "Borobudur", region: "Central Java", coordinates: "7.6079° S / 110.2038° E", period: "8th–9th century CE", architecture: "A stepped mandala plan rises through galleries and terraces to a central stupa. Relief sequences are built into the ascent, making circulation part of the monument’s narrative.", context: "The monument sits within a volcanic plain framed by mountains. Its position makes the relationship between sacred geometry, terrain and water systems especially legible.", left: "35%", top: "38%" },
  { id: "prambanan", name: "Prambanan", region: "Yogyakarta / Central Java", coordinates: "7.7520° S / 110.4915° E", period: "9th century CE", architecture: "A compound of tall, vertically articulated Hindu temples arranged around a central group. The layout organizes movement through nested sacred enclosures.", context: "On the eastern side of the Yogyakarta region, the site provides a contrasting reading of monument, settlement and the broad agricultural landscape.", left: "70%", top: "48%" },
  { id: "trowulan", name: "Trowulan", region: "East Java", coordinates: "7.5530° S / 112.3730° E", period: "Majapahit-era settlement landscape", architecture: "Rather than one isolated monument, Trowulan is read through dispersed remains including brick structures, gateways, pools and channels that suggest a larger urban system.", context: "The surviving traces sit within a populated landscape. Mapping fragments together helps explain how water, routes and civic space may have related.", left: "78%", top: "79%" },
];

function ExpeditionsPage() {
  const [activeId, setActiveId] = useState(waypoints[0].id);
  const active = waypoints.find((waypoint) => waypoint.id === activeId) ?? waypoints[0];

  return (
    <PageFrame className="expedition-page">
      <section className="expedition-hero">
        <div className="wrap expedition-hero-inner">
          <div><p className="eyebrow"><span>FIELD NOTE 03</span> INDONESIA / ARCHITECTURE / PLACE</p><h1>Reading old stone<br />through <em>the land.</em></h1><p>Ancient Indonesian architecture is also a study in geography: how routes, water, elevation and built form shape an experience of place.</p><span className="field-note-stamp"><Compass size={15} /> FIELD PERSPECTIVE / JAVA</span></div>
          <div className="expedition-orb" aria-hidden="true"><div className="orb-ring" /><div className="orb-sun" /><span>JAVA<br />ISLAND</span><small>7°30′ S / 110° E</small></div>
        </div>
      </section>
      <section className="waypoint-section">
        <div className="wrap">
          <div className="section-title-row"><div><p className="eyebrow"><span>01</span> WAYPOINT EXPLORER</p><h2>Three sites, one <em>landscape.</em></h2></div><p className="section-side-note">Select a site to inspect its location, architecture and geographic setting.</p></div>
          <div className="waypoint-explorer">
            <div className="schematic-map">
              <div className="map-topline"><span>JAVA / SCHEMATIC ROUTE</span><span>N ↑</span></div>
              <svg viewBox="0 0 700 480" preserveAspectRatio="none" aria-hidden="true">
                <path className="island-outline" d="M74 225 114 173 190 156 250 130 331 141 382 169 439 157 503 184 546 224 602 253 624 287 581 307 541 336 482 351 435 376 376 367 316 386 254 358 195 363 149 329 109 311 81 273Z" />
                <path className="island-ridge" d="M112 256c76-83 128-61 193-85s139 34 203 11 92 42 122 58" />
                <path className="route-line" d="M244 219Q390 226 484 275T542 346" />
                <path className="map-grid-line" d="M80 160h520M80 240h520M80 320h520M180 110v280M300 110v280M420 110v280M540 110v280" />
              </svg>
              {waypoints.map((waypoint, index) => (
                <button key={waypoint.id} className={`waypoint-pin${activeId === waypoint.id ? " is-active" : ""}`} type="button" style={{ left: waypoint.left, top: waypoint.top }} onClick={() => setActiveId(waypoint.id)} aria-pressed={activeId === waypoint.id} aria-label={`Explore ${waypoint.name}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span><i />{activeId === waypoint.id && <strong>{waypoint.name}</strong>}
                </button>
              ))}
              <div className="map-scale"><span>0</span><i /><span>200 KM</span></div>
              <div className="map-legend"><i /> WAYPOINT <i className="legend-route" /> ROUTE</div>
            </div>
            <motion.article className="waypoint-detail" key={active.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }}>
              <div className="waypoint-number"><span>SELECTED SITE</span><strong>0{waypoints.indexOf(active) + 1}</strong></div>
              <p className="eyebrow">{active.region} / {active.period}</p><h3>{active.name}</h3><div className="waypoint-coordinate"><Compass size={15} /> {active.coordinates}</div>
              <div className="field-observation"><span>ARCHITECTURAL OBSERVATION</span><p>{active.architecture}</p></div>
              <div className="field-observation"><span>LANDSCAPE CONTEXT</span><p>{active.context}</p></div>
              <div className="waypoint-switch">{waypoints.map((waypoint, index) => <button key={waypoint.id} className={active.id === waypoint.id ? "is-active" : ""} type="button" aria-label={`Show ${waypoint.name}`} onClick={() => setActiveId(waypoint.id)}>{String(index + 1).padStart(2, "0")}</button>)}</div>
            </motion.article>
          </div>
        </div>
      </section>
      <section className="field-notes-section">
        <div className="wrap">
          <div className="section-title-row"><div><p className="eyebrow"><span>02</span> FIELD NOTES</p><h2>Monuments are <em>systems.</em></h2></div><p className="section-side-note">An observer’s lens on structure, movement and the terrain around it.</p></div>
          <div className="field-grid">
            <article className="field-card field-card--large"><div className="field-art field-art--terrace"><span>FORM / 01</span><div className="terrace-shapes"><i /><i /><i /><i /><b /></div></div><span className="field-card-index">01 / VERTICALITY</span><h3>Build with the slope</h3><p>Terraced form makes ascent visible. Levels, thresholds and changes in view become part of the architecture rather than decoration around it.</p></article>
            <article className="field-card"><div className="field-art field-art--water"><span>HYDROLOGY / 02</span><div className="water-lines"><i /><i /><i /><i /><i /></div></div><span className="field-card-index">02 / WATER & ROUTE</span><h3>Infrastructure leaves traces</h3><p>Channels, basins and paths reveal how a monument participates in a larger managed landscape.</p></article>
            <article className="field-card"><div className="field-art field-art--relief"><span>DETAIL / 03</span><div className="relief-pattern"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><span className="field-card-index">03 / SURFACE</span><h3>Stone as a record</h3><p>Carved surfaces make the wall an information layer: images and sequence reward a slower, close reading.</p></article>
          </div>
          <p className="field-source-note">Coordinates are approximate site references. Historical descriptions are concise orientation notes; site interpretation continues to develop through research and conservation.</p>
        </div>
      </section>
      <section className="expedition-end wrap"><span className="eyebrow">BACK TO THE TECHNICAL ROUTE</span><NavLink to="/projects">Explore spatial systems <ArrowRight size={16} /></NavLink></section>
    </PageFrame>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "auto" }), [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <RouterRoute path="/" element={<HomePage />} />
        <RouterRoute path="/cv" element={<CvPage />} />
        <RouterRoute path="/projects" element={<ProjectsPage />} />
        <RouterRoute path="/expeditions" element={<ExpeditionsPage />} />
        <RouterRoute path="*" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}
