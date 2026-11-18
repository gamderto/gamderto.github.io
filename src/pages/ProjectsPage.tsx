import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Network, X } from "lucide-react";
import PageFrame from "../components/PageFrame";

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

export default function ProjectsPage() {
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

