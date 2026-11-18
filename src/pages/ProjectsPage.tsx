import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Network, X } from "lucide-react";
import PageFrame from "../components/PageFrame";

type ProjectCategory = "Geoinfraštruktúra" | "Systémy a backend" | "Web a databázy";
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
    title: "Portál priestorových dát a infraštruktúry",
    category: "Geoinfraštruktúra",
    summary: "Návrh portálu na prehliadanie záznamov o infraštruktúre v ich geografickom kontexte.",
    problem: "Záznamy o infraštruktúre sa ťažko používajú, keď sú údaje o objektoch a ich poloha v oddelených nástrojoch. Používatelia potrebujú jednotný prehľad o tom, čo sa kde nachádza a ako sa príslušný záznam udržiava.",
    architecture: "Aplikačná vrstva v PHP sprístupňuje mapu a detailné záznamy; MySQL uchováva normalizované údaje o objektoch, polohách a kategóriách; JavaScript zabezpečuje interakcie s mapou a filtrovanie.",
    implementation: "Relačné záznamy prepája spoločný identifikátor objektu so súradnicami. Serverová validácia chráni úpravy údajov a indexované polia kategórie a polohy zabezpečujú predvídateľné filtrovanie aj pri raste objemu dát.",
    diagram: ["Rozhranie PHP", "Priestorové API", "MySQL + súradnice"],
    mark: "GEO / 001",
  },
  {
    number: "02",
    title: "Paralelný nástroj na spracovanie dát",
    category: "Systémy a backend",
    summary: "Návrh systémového riešenia na rozdelenie vstupu, súbežné spracovanie úloh a spoľahlivé zhromažďovanie výsledkov.",
    problem: "Pri veľkých vstupných súboroch môže byť jednovláknové spracovanie pomalé a nereagujúce. Návrh musí rozdeliť nezávislé úlohy bez straty poradia, správnosti či zrozumiteľného hlásenia chýb.",
    architecture: "Spracovateľské jadro v C++ využíva obmedzený fond pracovných vlákien a front úloh; rozhranie v jazyku Java umožňuje štruktúrovanú konfiguráciu a kontrolu výsledkov.",
    implementation: "Vstup sa delí na deterministické časti. Vlákna odovzdávajú typované výsledky synchronizovanému zberaču; koordinátor priebežne hlási stav a výstup zostaví až po dokončení práce.",
    diagram: ["Front vstupu", "Fond vlákien", "Výsledky v poradí"],
    mark: "SYS / 002",
  },
  {
    number: "03",
    title: "Automatizované spracovanie priestorových dát",
    category: "Geoinfraštruktúra",
    summary: "Opakovateľný pracovný postup v jazyku Python na kontrolu, transformáciu a sumarizáciu priestorových súborov.",
    problem: "Pri manuálnej príprave priestorových dát ľahko vznikajú nejednotné výsledky. Pred ďalším spracovaním treba odhaliť nejasné predpoklady o súradniciach, chýbajúce polia aj nesprávne záznamy.",
    architecture: "Jednotlivé kroky v jazyku Python zabezpečujú kontrolu zdroja, validáciu, transformáciu a tvorbu výstupnej správy; každý odovzdáva ďalšiemu jasne definované údaje.",
    implementation: "Postup kontroluje povinné atribúty, zaznamenáva neplatné geometrie a vytvára stručný súhrn spracovania. Výslovné metadáta o súradnicovom systéme predchádzajú skrytým predpokladom pri transformácii.",
    diagram: ["Kontrola zdroja", "Validácia / transformácia", "Export + správa"],
    mark: "DÁTA / 003",
  },
  {
    number: "04",
    title: "Relačná služba a webová platforma",
    category: "Web a databázy",
    summary: "Model webovej platformy na prácu so štruktúrovanými záznamami, predvídateľnými dopytmi a responzívnym rozhraním.",
    problem: "Rastúca množina dát sa stáva nespoľahlivou, keď sa súvisiace informácie duplikujú alebo upravujú na oddelených stránkach. Používatelia potrebujú zrozumiteľné formuláre a dôveryhodné záznamy.",
    architecture: "Responzívne rozhranie odosiela požiadavky na koncové body v PHP; obmedzenia v MySQL a relačné tabuľky chránia integritu dát; dopyty v SQL zabezpečujú filtrované zoznamy a podrobné zobrazenia.",
    implementation: "Schéma rozdeľuje entity do prepojených tabuliek s primárnymi a cudzími kľúčmi. Formuláre sa validujú v rozhraní aj na serveri a pri neúspešnej operácii používateľ dostane jasnú spätnú väzbu.",
    diagram: ["Responzívne rozhranie", "Koncové body PHP", "Relačná schéma"],
    mark: "WEB / 004",
  },
];

const projectFilters = ["Všetky projekty", "Geoinfraštruktúra", "Systémy a backend", "Web a databázy"] as const;
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
        <div className="case-modal-head"><span>{project.mark} / PRÍPADOVÁ ŠTÚDIA</span><button type="button" aria-label="Zavrieť detail projektu" onClick={onClose}><X size={20} /></button></div>
        <p className="eyebrow">{project.category}</p><h2 id="case-title">{project.title}</h2><p className="case-summary">{project.summary}</p>
        <div className="case-content">
          <section><span className="eyebrow">01 / RIEŠENÝ PROBLÉM</span><p>{project.problem}</p></section>
          <section><span className="eyebrow">02 / ARCHITEKTÚRA A TECHNOLÓGIE</span><p>{project.architecture}</p></section>
          <section><span className="eyebrow">03 / KĽÚČOVÁ IMPLEMENTÁCIA</span><p>{project.implementation}</p></section>
        </div>
        <div className="case-diagram">
          <div className="diagram-label"><Network size={15} /> INTERAKTÍVNA ARCHITEKTÚRA / VYBERTE VRSTVU</div>
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
            <span>UKÁŽKOVÉ DÁTA / {project.mark} / VRSTVA 0{selectedLayer + 1}</span>
            <code>{`{ "komponent": "${project.diagram[selectedLayer]}", "stav": "overené" }`}</code>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectFilter>("Všetky projekty");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const visibleProjects = projects.filter((project) => filter === "Všetky projekty" || project.category === filter);

  return (
    <PageFrame className="projects-page">
      <section className="page-hero wrap">
        <div className="page-hero-copy"><p className="eyebrow"><span>DOKUMENT 02</span> PROJEKTY / INŽINIERSTVO</p><h1>Systémy navrhnuté<br />pre <em>skutočný svet.</em></h1><p>Štyri technické štúdie zamerané na mapovanie, spracovanie dát, architektúru aplikácií a relačné webové systémy. Otvorte si detail a preskúmajte rozhodnutia pri návrhu.</p></div>
        <div className="page-hero-index"><span>PORTFÓLIO</span><strong>04 ŠTÚDIE</strong><span>TECHNICKÉ NÁVRHY</span></div>
      </section>
      <section className="project-showcase">
        <div className="wrap">
          <div className="project-toolbar"><span className="eyebrow">VYBRANÉ TECHNICKÉ NÁVRHY / {String(visibleProjects.length).padStart(2, "0")}</span><div className="project-filters" role="group" aria-label="Filtrovať projekty">{projectFilters.map((item) => <button type="button" key={item} aria-pressed={filter === item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
          <div className="engineering-grid">
            {visibleProjects.map((project) => (
              <motion.article className="engineering-card" key={project.number} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <button className="engineering-open" type="button" onClick={() => setActiveProject(project)} aria-label={`Otvoriť prípadovú štúdiu: ${project.title}`}>
                  <div className={`project-visual project-visual--${project.number}`}>
                    <span className="visual-topline">{project.mark}<span>SCHEMATICKÉ / NIE JE V MERÍTKU</span></span>
                    <div className="visual-lines"><i /><i /><i /><i /><b /></div>
                    <div className="visual-stamp">{project.number}<ArrowUpRight size={16} /></div>
                    <span className="visual-caption">{project.diagram.join(" → ")}</span>
                  </div>
                  <div className="engineering-info"><div><span className="project-type">{project.category}</span><h2>{project.title}</h2><p>{project.summary}</p></div><span className="open-case">ZOBRAZIŤ DETAIL <ArrowUpRight size={15} /></span></div>
                  <div className="engineering-specs">
                    <div><span>RIEŠENÝ PROBLÉM</span><p>{project.problem}</p></div>
                    <div><span>ARCHITEKTÚRA A TECHNOLÓGIE</span><p>{project.architecture}</p></div>
                    <div><span>KĽÚČOVÁ IMPLEMENTÁCIA</span><p>{project.implementation}</p></div>
                  </div>
                </button>
              </motion.article>
            ))}
          </div>
          <div className="project-disclaimer"><span className="status-dot" /> KONCEPČNÉ ŠTÚDIE A TECHNICKÉ NÁVRHY, NIE PREZENTÁCIA NASADENÝCH PRODUKTOV.</div>
        </div>
      </section>
      <section className="project-process wrap"><div><p className="eyebrow"><span>01</span> POSTUP</p><h2>Od problému<br />až <em>k dátam.</em></h2></div><div className="process-steps"><div><span>01</span><strong>Určiť potrebu</strong><p>Ujasniť si, kto bude systém používať a aké rozhodnutie má podporiť.</p></div><div><span>02</span><strong>Navrhnúť údaje</strong><p>Ešte pred rozhraním zvoliť vhodné štruktúry, vzťahy a pravidlá validácie.</p></div><div><span>03</span><strong>Uľahčiť kontrolu</strong><p>Sprístupniť dôležité stavy, zrozumiteľné chyby a správanie, ktoré možno testovať.</p></div></div></section>
      <AnimatePresence>{activeProject && <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />}</AnimatePresence>
    </PageFrame>
  );
}

